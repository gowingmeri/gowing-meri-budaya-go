export interface Product {
  id: string;
  title: string;
  kategori: 
    | "Motif" 
    | "Pola" 
    | "Aksara" 
    | "Ornamen" 
    | "Ilustrasi"
    | "Texture"
    | "Generatif";

  imageUrl: string[];
  thumbnail: string;
  description: string;
  jenisLisensi: "personal" | "commercial" | "enterprise";
  price: number;

  creator: string;     
  mitraId: string;          
  tags: string[];

  resolution?: string;
  isGenerative?: boolean;
  metadata?: Record<string, any>;
}

export const products: Product[] = [
  {
    id: "MOTIF-001",
    title: "Motif Parang Klaten",
    kategori: "Motif",
    thumbnail: "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg",
    imageUrl: [
      "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg",
      "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg"
    ],
    description: "Motif Parang klasik khas Jawa dengan gaya tradisional yang elegan.",
    jenisLisensi: "commercial",
    price: 250000,
    creator: "Sanggar Parang Utama",
    mitraId: "MITRA-001",
    tags: ["parang", "batik", "jawa", "klasik"],
    resolution: "4500x4500px",
    metadata: { daerah: "Yogyakarta", makna: "keteguhan & kekuatan" }
  },

  {
    id: "MOTIF-002",
    title: "Motif Mega Mendung",
    kategori: "Motif",
    thumbnail: "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg",
    imageUrl: [
      "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg",
      "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg"
    ],
    description: "Motif awan khas Cirebon dengan nuansa biru gradasi.",
    jenisLisensi: "enterprise",
    price: 500000,
    creator: "Studio Batik Cirebon",
    mitraId: "MITRA-002",
    tags: ["mega mendung", "cirebon", "awan"],
    resolution: "5000x5000px",
    metadata: { daerah: "Cirebon", makna: "ketenangan" }
  },

  {
    id: "POLA-001",
    title: "Pattern Lereng Modern",
    kategori: "Pola",
    thumbnail: "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg",
    imageUrl: [
      "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg",
      "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg"
    ],
    description: "Pola lereng batik dalam format seamless untuk UI & textile.",
    jenisLisensi: "commercial",
    price: 200000,
    creator: "DKV Jogja",
    mitraId: "MITRA-003",
    tags: ["lereng", "seamless", "pattern"],
    resolution: "4096x4096px"
  },

  {
    id: "POLA-002",
    title: "Seamless Kawung",
    kategori: "Pola",
    thumbnail: "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg",
    imageUrl: [
      "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg",
      "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg"
    ],
    description: "Pola Kawung versi clean untuk kebutuhan branding & motion graphics.",
    jenisLisensi: "commercial",
    price: 180000,
    creator: "Kawung Design Lab",
    mitraId: "MITRA-004",
    tags: ["kawung", "seamless", "clean"],
    resolution: "4000x4000px"
  },

  {
    id: "AKSARA-001",
    title: "Aksara Jawa - Hanacaraka Set",
    kategori: "Aksara",
    thumbnail: "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg",
    imageUrl: [
      "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg"
    ],
    description: "Set aksara Jawa lengkap dalam format vektor (.svg).",
    jenisLisensi: "commercial",
    price: 300000,
    creator: "Komunitas Aksara Nusantara",
    mitraId: "MITRA-005",
    tags: ["aksara jawa", "hanacaraka"],
    resolution: "infinite (vector)"
  },

  {
    id: "AKSARA-002",
    title: "Aksara Bali Ornamental",
    kategori: "Aksara",
    thumbnail: "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg",
    imageUrl: [
      "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg"
    ],
    description: "Aksara Bali ornamental gaya tradisional untuk poster & branding.",
    jenisLisensi: "commercial",
    price: 280000,
    creator: "Museum Bali",
    mitraId: "MITRA-006",
    tags: ["aksara bali", "ornamental"]
  },

  {
    id: "ORN-001",
    title: "Ornamen Toraja Spiral",
    kategori: "Ornamen",
    thumbnail: "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg",
    imageUrl: [
      "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg"
    ],
    description: "Ornamen Toraja simbol spiral yang melambangkan kehidupan.",
    jenisLisensi: "enterprise",
    price: 450000,
    creator: "Yayasan Budaya Toraja",
    mitraId: "MITRA-007",
    tags: ["toraja", "spiral", "ornamen"]
  },

  {
    id: "ORN-002",
    title: "Ornamen Dayak Flame",
    kategori: "Ornamen",
    thumbnail: "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg",
    imageUrl: [
      "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg"
    ],
    description: "Ornamen api khas Dayak dengan garis tegas dan detail kuat.",
    jenisLisensi: "commercial",
    price: 320000,
    creator: "Sanggar Dayak Borneo",
    mitraId: "MITRA-008",
    tags: ["dayak", "ornamen", "flame"]
  },

  {
    id: "ILUS-001",
    title: "Wayang Arjuna 2D",
    kategori: "Ilustrasi",
    thumbnail: "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg",
    imageUrl: [
      "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg"
    ],
    description: "Ilustrasi Arjuna gaya flat-vector untuk keperluan UI/branding.",
    jenisLisensi: "commercial",
    price: 280000,
    creator: "Studio Wayang Modern",
    mitraId: "MITRA-009",
    tags: ["wayang", "arjuna", "ilustrasi"],
    resolution: "6000x6000px"
  },

  {
    id: "ILUS-002",
    title: "Ilustrasi Rumah Gadang",
    kategori: "Ilustrasi",
    thumbnail: "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg",
    imageUrl: [
      "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg"
    ],
    description: "Ilustrasi 2D Rumah Gadang Minang gaya minimalis.",
    jenisLisensi: "personal",
    price: 120000,
    creator: "Minang Design House",
    mitraId: "MITRA-010",
    tags: ["rumah gadang", "minang"]
  },

  {
    id: "TEX-001",
    title: "Texture Anyaman Bambu",
    kategori: "Texture",
    thumbnail: "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg",
    imageUrl: [
      "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg"
    ],
    description: "Texture anyaman bambu high-resolution untuk 3D & rendering.",
    jenisLisensi: "commercial",
    price: 220000,
    creator: "Studio Texture Nusantara",
    mitraId: "MITRA-011",
    tags: ["texture", "anyaman", "bambu"]
  },

  {
    id: "TEX-002",
    title: "Texture Kayu Ukiran Jepara",
    kategori: "Texture",
    thumbnail: "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg",
    imageUrl: [
      "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg"
    ],
    description: "Permukaan kayu ukiran Jepara untuk keperluan arsitektur dan 3D.",
    jenisLisensi: "enterprise",
    price: 400000,
    creator: "Pengrajin Jepara",
    mitraId: "MITRA-012",
    tags: ["texture", "kayu", "jepara"]
  },

  {
    id: "GEN-001",
    title: "Cyberpunk Mega Mendung",
    kategori: "Generatif",
    thumbnail: "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg",
    imageUrl: [
      "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg"
    ],
    description: "Aset generatif dengan prompt: 'Mega Mendung style cyberpunk neon'.",
    jenisLisensi: "enterprise",
    price: 600000,
    creator: "RupaGen AI",
    mitraId: "MITRA-002",
    tags: ["generative", "mega mendung", "cyberpunk"],
    isGenerative: true,
    metadata: { prompt: "mega mendung cyberpunk neon", model: "RupaGen-v1" }
  },

  {
    id: "GEN-002",
    title: "Ornamen Dayak Futuristik",
    kategori: "Generatif",
    thumbnail: "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg",
    imageUrl: [
      "https://imgsrv2.voi.id/vgXBZUqvaOA-YhTSo6LH640C9vwnahxotNBSS_PZAIk/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy81MjA0NzMvMjAyNTEwMDYxMDAyLW1haW4uY3JvcHBlZF8xNzU5NzE5NzY2LmpwZw.jpg"
    ],
    description: "Aset generatif gaya Dayak futuristik hasil RupaGen.",
    jenisLisensi: "commercial",
    price: 350000,
    creator: "RupaGen AI",
    mitraId: "MITRA-008",
    tags: ["dayak", "futuristic", "generative"],
    isGenerative: true
  }
];
