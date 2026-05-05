import { useEffect, useRef, useState } from "react";
import type { TruckRoute } from "@/data/truckRoutes";

export interface AnimatedTruck {
  route: TruckRoute;
  position: [number, number];
  bearing: number;
  segmentIndex: number;
  progress: number; // 0-1 within segment
}

// Constant ground speed in degrees per second.
// 1 degree of latitude ≈ 111 km, so 0.00025 deg/s ≈ ~100 m/s of map-distance,
// which on a city zoom looks like a slow, steady delivery truck.
const SPEED_DEG_PER_SEC = 0.00025;
// Throttle React updates to ~10 fps so the map isn't constantly re-rendering.
const UPDATE_INTERVAL_MS = 100;

function bearingBetween(a: [number, number], b: [number, number]) {
  const dy = b[0] - a[0];
  const dx = b[1] - a[1];
  return (Math.atan2(dx, dy) * 180) / Math.PI;
}

export function useAnimatedTrucks(routes: TruckRoute[]) {
  const [trucks, setTrucks] = useState<AnimatedTruck[]>([]);

  useEffect(() => {
    setTrucks(
      routes.map((r, i) => ({
        route: r,
        position: r.path[0],
        bearing: bearingBetween(r.path[0], r.path[1] ?? r.path[0]),
        segmentIndex: 0,
        progress: (i * 0.27) % 1,
      })),
    );
  }, [routes]);
  const rafRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1); // seconds, clamp big jumps
      last = now;

      // Throttle React state updates
      if (now - lastUpdateRef.current < UPDATE_INTERVAL_MS) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      lastUpdateRef.current = now;

      setTrucks((prev) =>
        prev.map((t) => {
          const path = t.route.path;
          let segIdx = t.segmentIndex;
          let prog = t.progress;

          // Move a fixed map-distance, regardless of segment length
          let remaining = SPEED_DEG_PER_SEC * dt;
          let safety = 0;
          while (remaining > 0 && safety++ < 10) {
            const a = path[segIdx];
            const b = path[(segIdx + 1) % path.length];
            const segLen = Math.hypot(b[0] - a[0], b[1] - a[1]) || 0.0001;
            const distLeftInSeg = (1 - prog) * segLen;
            if (remaining < distLeftInSeg) {
              prog += remaining / segLen;
              remaining = 0;
            } else {
              remaining -= distLeftInSeg;
              segIdx = (segIdx + 1) % path.length;
              prog = 0;
            }
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
