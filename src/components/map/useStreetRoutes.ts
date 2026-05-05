import { useEffect, useState } from "react";
import type { TruckRoute } from "@/data/truckRoutes";

// Resolve TruckRoute waypoints into actual street-following polylines via the
// public OSRM demo router. Falls back to the original straight waypoints if
// the request fails or hasn't completed yet.
async function fetchOsrmPath(
  waypoints: [number, number][],
): Promise<[number, number][] | null> {
  try {
    const coords = waypoints.map(([lat, lng]) => `${lng},${lat}`).join(";");
    const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const geom = data?.routes?.[0]?.geometry?.coordinates as
      | [number, number][]
      | undefined;
    if (!geom || geom.length < 2) return null;
    // OSRM returns [lng, lat] — flip to [lat, lng] and drop invalid coords
    const path = geom
      .filter(
        (c) =>
          Array.isArray(c) &&
          typeof c[0] === "number" &&
          typeof c[1] === "number" &&
          Number.isFinite(c[0]) &&
          Number.isFinite(c[1]),
      )
      .map(([lng, lat]) => [lat, lng] as [number, number]);
    return path.length >= 2 ? path : null;
  } catch {
    return null;
  }
}

export function useStreetRoutes(routes: TruckRoute[]): TruckRoute[] {
  const [resolved, setResolved] = useState<TruckRoute[]>(routes);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const updated = await Promise.all(
        routes.map(async (r) => {
          const path = await fetchOsrmPath(r.path);
          return path ? { ...r, path } : r;
        }),
      );
      if (!cancelled) setResolved(updated);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return resolved;
}
