export interface TruckRoute {
  id: string;
  plate: string;
  driver: string;
  category: "reciclavel" | "organico" | "misto";
  capacity: number; // 0-100
  // path of [lat, lng] coords the truck cycles through
  path: [number, number][];
}

// Each route is a polyline through real SP streets (approximate, smoothed)
export const TRUCK_ROUTES: TruckRoute[] = [
  {
    id: "t1",
    plate: "BIN-1842",
    driver: "Carlos M.",
    category: "reciclavel",
    capacity: 62,
    path: [
      [-23.5648, -46.6849], // Pinheiros
      [-23.5601, -46.682],
      [-23.5546, -46.6912], // Vila Madalena
      [-23.5447, -46.6566], // Higienópolis
      [-23.5505, -46.6333], // Sé
      [-23.5587, -46.6346], // Liberdade
      [-23.5651, -46.6481], // Bela Vista
      [-23.5634, -46.6716], // Jardins
      [-23.5648, -46.6849], // back
    ],
  },
  {
    id: "t2",
    plate: "BIN-2310",
    driver: "Ana P.",
    category: "organico",
    capacity: 38,
    path: [
      [-23.6067, -46.6661], // Moema
      [-23.5874, -46.6576], // Ibirapuera
      [-23.5887, -46.6356], // Vila Mariana
      [-23.5808, -46.6792], // Itaim
      [-23.6112, -46.6936], // Brooklin
      [-23.6067, -46.6661],
    ],
  },
  {
    id: "t3",
    plate: "BIN-0975",
    driver: "Rafael S.",
    category: "misto",
    capacity: 81,
    path: [
      [-23.5036, -46.6242], // Santana
      [-23.5274, -46.7045], // Lapa
      [-23.5267, -46.6877], // Pompeia
      [-23.5339, -46.6755], // Perdizes
      [-23.5447, -46.6566], // Higienópolis
      [-23.5575, -46.5959], // Mooca
      [-23.5408, -46.5764], // Tatuapé
      [-23.5036, -46.6242],
    ],
  },
  {
    id: "t4",
    plate: "BIN-3677",
    driver: "Juliana R.",
    category: "reciclavel",
    capacity: 24,
    path: [
      [-23.5505, -46.6333], // Sé
      [-23.5575, -46.5959], // Mooca
      [-23.5408, -46.5764], // Tatuapé
      [-23.5587, -46.6346],
      [-23.5505, -46.6333],
    ],
  },
];
