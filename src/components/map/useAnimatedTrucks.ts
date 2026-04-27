import { useEffect, useRef, useState } from "react";
import type { TruckRoute } from "@/data/truckRoutes";

export interface AnimatedTruck {
  route: TruckRoute;
  position: [number, number];
  bearing: number;
  segmentIndex: number;
  progress: number; // 0-1 within segment
}

const SPEED_KMS = 0.00012; // approx degrees per tick — visually pleasant

function bearingBetween(a: [number, number], b: [number, number]) {
  const dy = b[0] - a[0];
  const dx = b[1] - a[1];
  return (Math.atan2(dx, dy) * 180) / Math.PI;
}

export function useAnimatedTrucks(routes: TruckRoute[]) {
  const [trucks, setTrucks] = useState<AnimatedTruck[]>(() =>
    routes.map((r, i) => ({
      route: r,
      position: r.path[0],
      bearing: bearingBetween(r.path[0], r.path[1]),
      segmentIndex: 0,
      // stagger them so they don't all start at the same place
      progress: (i * 0.27) % 1,
    })),
  );
  const rafRef = useRef<number>();

  useEffect(() => {
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 60);
      last = now;
      setTrucks((prev) =>
        prev.map((t) => {
          const path = t.route.path;
          let segIdx = t.segmentIndex;
          let prog = t.progress;
          const a = path[segIdx];
          const b = path[(segIdx + 1) % path.length];
          const segLen = Math.hypot(b[0] - a[0], b[1] - a[1]);
          // step proportional to time
          const step = (SPEED_KMS * dt * 60) / Math.max(segLen, 0.0001);
          prog += step;
          while (prog >= 1) {
            prog -= 1;
            segIdx = (segIdx + 1) % path.length;
          }
          const aN = path[segIdx];
          const bN = path[(segIdx + 1) % path.length];
          const lat = aN[0] + (bN[0] - aN[0]) * prog;
          const lng = aN[1] + (bN[1] - aN[1]) * prog;
          return {
            ...t,
            segmentIndex: segIdx,
            progress: prog,
            position: [lat, lng],
            bearing: bearingBetween(aN, bN),
          };
        }),
      );
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return trucks;
}
