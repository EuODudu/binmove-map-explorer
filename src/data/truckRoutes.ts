export interface TruckRoute {
  id: string;
  plate: string;
  driver: string;
  category: "reciclavel" | "organico" | "misto";
  capacity: number; // 0-100
  // Waypoints [lat, lng]. Resolved to street-following polylines via OSRM
  // at runtime. Each route is a medium-sized loop covering several blocks
  // within a neighborhood — compact but not tiny.
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
      [-23.5620, -46.6810],
      [-23.5680, -46.6880],
      [-23.5710, -46.6960],
      [-23.5650, -46.7000],
      [-23.5590, -46.6920],
      [-23.5620, -46.6810],
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
      [-23.5510, -46.6870],
      [-23.5560, -46.6940],
      [-23.5530, -46.7010],
      [-23.5470, -46.6985],
      [-23.5455, -46.6900],
      [-23.5510, -46.6870],
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
      [-23.5410, -46.6520],
      [-23.5460, -46.6580],
      [-23.5440, -46.6660],
      [-23.5380, -46.6640],
      [-23.5360, -46.6560],
      [-23.5410, -46.6520],
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
      [-23.5630, -46.6430],
      [-23.5690, -46.6480],
      [-23.5730, -46.6550],
      [-23.5690, -46.6600],
      [-23.5620, -46.6530],
      [-23.5630, -46.6430],
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
      [-23.6030, -46.6620],
      [-23.6090, -46.6680],
      [-23.6120, -46.6760],
      [-23.6060, -46.6790],
      [-23.6000, -46.6710],
      [-23.6030, -46.6620],
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
      [-23.5860, -46.6310],
      [-23.5920, -46.6360],
      [-23.5960, -46.6430],
      [-23.5920, -46.6470],
      [-23.5860, -46.6400],
      [-23.5860, -46.6310],
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
      [-23.5780, -46.6720],
      [-23.5830, -46.6770],
      [-23.5880, -46.6840],
      [-23.5840, -46.6880],
      [-23.5780, -46.6810],
      [-23.5780, -46.6720],
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
      [-23.5310, -46.6700],
      [-23.5360, -46.6760],
      [-23.5410, -46.6830],
      [-23.5370, -46.6870],
      [-23.5310, -46.6790],
      [-23.5310, -46.6700],
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
      [-23.5380, -46.5710],
      [-23.5430, -46.5770],
      [-23.5480, -46.5830],
      [-23.5440, -46.5870],
      [-23.5380, -46.5800],
      [-23.5380, -46.5710],
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
      [-23.5550, -46.5900],
      [-23.5600, -46.5960],
      [-23.5650, -46.6020],
      [-23.5610, -46.6060],
      [-23.5550, -46.5990],
      [-23.5550, -46.5900],
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
      [-23.5010, -46.6190],
      [-23.5060, -46.6250],
      [-23.5110, -46.6310],
      [-23.5070, -46.6350],
      [-23.5010, -46.6280],
      [-23.5010, -46.6190],
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
      [-23.5240, -46.6990],
      [-23.5290, -46.7050],
      [-23.5340, -46.7110],
      [-23.5300, -46.7150],
      [-23.5240, -46.7080],
      [-23.5240, -46.6990],
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
      [-23.6250, -46.6360],
      [-23.6300, -46.6420],
      [-23.6350, -46.6480],
      [-23.6310, -46.6520],
      [-23.6250, -46.6450],
      [-23.6250, -46.6360],
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
      [-23.5200, -46.6500],
      [-23.5250, -46.6560],
      [-23.5300, -46.6620],
      [-23.5260, -46.6660],
      [-23.5200, -46.6590],
      [-23.5200, -46.6500],
    ],
  },
];
