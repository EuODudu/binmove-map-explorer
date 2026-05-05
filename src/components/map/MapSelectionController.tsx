import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { COLLECTION_POINTS } from "@/data/collectionPoints";
import type { AnimatedTruck } from "./useAnimatedTrucks";

interface MapSelectionControllerProps {
  selectedPointId: string | null;
  selectedTruckId: string | null;
  trucks: AnimatedTruck[];
}

export default function MapSelectionController({
  selectedPointId,
  selectedTruckId,
  trucks,
}: MapSelectionControllerProps) {
  const map = useMap();
  const trucksRef = useRef(trucks);
  trucksRef.current = trucks;

  useEffect(() => {
    let target: [number, number] | null = null;

    if (selectedPointId) {
      const point = COLLECTION_POINTS.find((p) => p.id === selectedPointId);
      target = point ? point.position : null;
    } else if (selectedTruckId) {
      const truck = trucksRef.current.find((t) => t.route.id === selectedTruckId);
      target = truck ? truck.position : null;
    }

    if (target) {
      map.flyTo(target, 15, { duration: 0.8 });
    }
  }, [map, selectedPointId, selectedTruckId]);

  return null;
}