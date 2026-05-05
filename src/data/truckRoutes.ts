export interface TruckRoute {
  id: string;
  plate: string;
  driver: string;
  category: "reciclavel" | "organico" | "misto";
  capacity: number; // 0-100
  // Waypoints [lat, lng]. Resolved to street-following polylines via OSRM
  // at runtime (with motorways excluded). Each route is a tight loop inside
  // a single neighborhood so the path stays clean and predictable.
  path: [number, number][];
}

export const TRUCK_ROUTES: TruckRoute[] = [
  // ---------- Pinheiros ----------
  {
    id: "t1",
    plate: "BIN-1842",
    driver: "Carlos M.",
    category: "reciclavel",
    capacity: 62,
    path: [
      [-23.5648, -46.6849],
      [-23.5670, -46.6905],
      [-23.5625, -46.6932],
      [-23.5602, -46.6878],
      [-23.5648, -46.6849],
    ],
  },
  // ---------- Vila Madalena ----------
  {
    id: "t2",
    plate: "BIN-2310",
    driver: "Ana P.",
    category: "organico",
    capacity: 38,
    path: [
      [-23.5546, -46.6912],
      [-23.5520, -46.6955],
      [-23.5495, -46.6920],
      [-23.5525, -46.6878],
      [-23.5546, -46.6912],
    ],
  },
  // ---------- Higienópolis ----------
  {
    id: "t3",
    plate: "BIN-0975",
    driver: "Rafael S.",
    category: "misto",
    capacity: 81,
    path: [
      [-23.5447, -46.6566],
      [-23.5420, -46.6610],
      [-23.5398, -46.6565],
      [-23.5430, -46.6520],
      [-23.5447, -46.6566],
    ],
  },
  // ---------- Bela Vista ----------
  {
    id: "t4",
    plate: "BIN-3677",
    driver: "Juliana R.",
    category: "reciclavel",
    capacity: 24,
    path: [
      [-23.5651, -46.6481],
      [-23.5680, -46.6520],
      [-23.5705, -46.6480],
      [-23.5675, -46.6445],
      [-23.5651, -46.6481],
    ],
  },
  // ---------- Moema ----------
  {
    id: "t5",
    plate: "BIN-4521",
    driver: "Marcos L.",
    category: "organico",
    capacity: 55,
    path: [
      [-23.6067, -46.6661],
      [-23.6095, -46.6700],
      [-23.6045, -46.6735],
      [-23.6020, -46.6685],
      [-23.6067, -46.6661],
    ],
  },
  // ---------- Vila Mariana ----------
  {
    id: "t6",
    plate: "BIN-5089",
    driver: "Patrícia G.",
    category: "misto",
    capacity: 47,
    path: [
      [-23.5887, -46.6356],
      [-23.5915, -46.6390],
      [-23.5942, -46.6345],
      [-23.5910, -46.6310],
      [-23.5887, -46.6356],
    ],
  },
  // ---------- Itaim Bibi ----------
  {
    id: "t7",
    plate: "BIN-6634",
    driver: "Felipe T.",
    category: "reciclavel",
    capacity: 70,
    path: [
      [-23.5808, -46.6792],
      [-23.5832, -46.6755],
      [-23.5860, -46.6790],
      [-23.5835, -46.6825],
      [-23.5808, -46.6792],
    ],
  },
  // ---------- Perdizes ----------
  {
    id: "t8",
    plate: "BIN-7720",
    driver: "Luana D.",
    category: "organico",
    capacity: 33,
    path: [
      [-23.5339, -46.6755],
      [-23.5365, -46.6790],
      [-23.5390, -46.6755],
      [-23.5360, -46.6720],
      [-23.5339, -46.6755],
    ],
  },
  // ---------- Tatuapé ----------
  {
    id: "t9",
    plate: "BIN-8412",
    driver: "Bruno A.",
    category: "misto",
    capacity: 58,
    path: [
      [-23.5408, -46.5764],
      [-23.5432, -46.5800],
      [-23.5460, -46.5760],
      [-23.5430, -46.5725],
      [-23.5408, -46.5764],
    ],
  },
  // ---------- Mooca ----------
  {
    id: "t10",
    plate: "BIN-9156",
    driver: "Camila V.",
    category: "reciclavel",
    capacity: 41,
    path: [
      [-23.5575, -46.5959],
      [-23.5600, -46.5995],
      [-23.5625, -46.5955],
      [-23.5598, -46.5920],
      [-23.5575, -46.5959],
    ],
  },
  // ---------- Santana ----------
  {
    id: "t11",
    plate: "BIN-1023",
    driver: "Diego R.",
    category: "organico",
    capacity: 67,
    path: [
      [-23.5036, -46.6242],
      [-23.5060, -46.6280],
      [-23.5085, -46.6240],
      [-23.5058, -46.6205],
      [-23.5036, -46.6242],
    ],
  },
  // ---------- Lapa ----------
  {
    id: "t12",
    plate: "BIN-2287",
    driver: "Eduarda M.",
    category: "misto",
    capacity: 29,
    path: [
      [-23.5274, -46.7045],
      [-23.5300, -46.7080],
      [-23.5325, -46.7040],
      [-23.5298, -46.7008],
      [-23.5274, -46.7045],
    ],
  },
  // ---------- Saúde ----------
  {
    id: "t13",
    plate: "BIN-3540",
    driver: "Henrique B.",
    category: "reciclavel",
    capacity: 52,
    path: [
      [-23.6280, -46.6410],
      [-23.6305, -46.6445],
      [-23.6330, -46.6410],
      [-23.6302, -46.6378],
      [-23.6280, -46.6410],
    ],
  },
  // ---------- Santa Cecília ----------
  {
    id: "t14",
    plate: "BIN-4798",
    driver: "Isabela K.",
    category: "organico",
    capacity: 44,
    path: [
      [-23.5232, -46.6553],
      [-23.5258, -46.6588],
      [-23.5282, -46.6552],
      [-23.5255, -46.6520],
      [-23.5232, -46.6553],
    ],
  },
];
