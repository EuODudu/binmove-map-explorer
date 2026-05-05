export interface TruckRoute {
  id: string;
  plate: string;
  driver: string;
  category: "reciclavel" | "organico" | "misto";
  capacity: number; // 0-100
  // Waypoints [lat, lng]. The actual driving path is resolved via OSRM
  // at runtime so the polyline follows the real streets instead of
  // cutting through buildings.
  path: [number, number][];
}

export const TRUCK_ROUTES: TruckRoute[] = [
  {
    id: "t1",
    plate: "BIN-1842",
    driver: "Carlos M.",
    category: "reciclavel",
    capacity: 62,
    path: [
      [-23.5648, -46.6849], // Pinheiros
      [-23.5546, -46.6912], // Vila Madalena
      [-23.5447, -46.6566], // Higienópolis
      [-23.5505, -46.6333], // Sé
      [-23.5651, -46.6481], // Bela Vista
      [-23.5634, -46.6716], // Jardins
      [-23.5648, -46.6849],
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
      [-23.5505, -46.6333],
    ],
  },
  {
    id: "t5",
    plate: "BIN-4521",
    driver: "Marcos L.",
    category: "organico",
    capacity: 55,
    path: [
      [-23.6280, -46.6410], // Saúde
      [-23.6431, -46.6291], // Jabaquara
      [-23.6189, -46.6552], // Vila Mascote
      [-23.6280, -46.6410],
    ],
  },
  {
    id: "t6",
    plate: "BIN-5089",
    driver: "Patrícia G.",
    category: "misto",
    capacity: 47,
    path: [
      [-23.5232, -46.6553], // Santa Cecília
      [-23.5180, -46.6411], // Bom Retiro
      [-23.5290, -46.6280], // Brás
      [-23.5400, -46.6420], // Centro
      [-23.5232, -46.6553],
    ],
  },
  {
    id: "t7",
    plate: "BIN-6634",
    driver: "Felipe T.",
    category: "reciclavel",
    capacity: 70,
    path: [
      [-23.5705, -46.7035], // Vila Leopoldina
      [-23.5468, -46.7138], // Alto de Pinheiros
      [-23.5627, -46.6932], // Pinheiros leste
      [-23.5705, -46.7035],
    ],
  },
  {
    id: "t8",
    plate: "BIN-7720",
    driver: "Luana D.",
    category: "organico",
    capacity: 33,
    path: [
      [-23.5320, -46.7910], // Butantã
      [-23.5610, -46.7320], // Caxingui
      [-23.5800, -46.7050], // Morumbi
      [-23.5650, -46.7600], // Rio Pequeno
      [-23.5320, -46.7910],
    ],
  },
];
