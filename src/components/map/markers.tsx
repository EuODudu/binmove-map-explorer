import L from "leaflet";
import { CATEGORY_META, type WasteCategory } from "@/data/collectionPoints";

export function createPointIcon(category: WasteCategory, highlighted = false) {
  const meta = CATEGORY_META[category];
  const size = highlighted ? 38 : 30;
  const ring = highlighted ? "ring-pulse" : "";

  const html = `
    <div class="binmove-point-icon ${ring}" style="
      width:${size}px;height:${size}px;
      background:${meta.color};
      border-radius:9999px;
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 0 0 4px hsl(0 0% 5%/0.9), 0 0 18px ${meta.color}aa;
      border:2px solid #0a0a0a;
      font-size:${size * 0.5}px;line-height:1;
      transition:transform .2s ease;
    ">
      <span>${meta.emoji}</span>
    </div>`;

  return L.divIcon({
    html,
    className: "binmove-point-marker",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 4],
  });
}

export function createTruckIcon(bearing = 0, color = "#22c55e") {
  const html = `
    <div class="binmove-marker-pulse" style="
      width:42px;height:42px;
      background:linear-gradient(135deg, ${color}, #16a34a);
      border-radius:12px;
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 0 0 3px hsl(0 0% 5%/0.95), 0 0 22px ${color}cc;
      border:2px solid #0a0a0a;
      transform:rotate(${bearing}deg);
    ">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
        <path d="M15 18H9"/>
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
        <circle cx="17" cy="18" r="2"/>
        <circle cx="7" cy="18" r="2"/>
      </svg>
    </div>`;

  return L.divIcon({
    html,
    className: "binmove-truck-marker",
    iconSize: [42, 42],
    iconAnchor: [21, 21],
    popupAnchor: [0, -24],
  });
}

export function createCategoryBadgeIcon(category: WasteCategory) {
  const meta = CATEGORY_META[category];
  const html = `
    <div style="
      width:24px;height:24px;
      background:${meta.color};
      border-radius:9999px;
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 0 0 2px hsl(0 0% 5%/0.9), 0 0 10px ${meta.color}aa;
      border:1.5px solid #0a0a0a;
      font-size:12px;line-height:1;
    "><span>${meta.emoji}</span></div>`;
  return L.divIcon({
    html,
    className: "binmove-route-badge",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}
