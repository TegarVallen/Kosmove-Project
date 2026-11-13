// Bentuk data MENTAH dari External API (https://dummyjson.com)
export interface DummyProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  weight: number;
  thumbnail: string;
}

export interface DummyProductsResponse {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
}

// Bentuk data yang dipakai di aplikasi KosMove (hasil mapping dari DummyProduct)
export interface Barang {
  id: number;
  nama: string;
  deskripsi: string;
  kategori: string;
  beratKg: number;
  thumbnail: string;
}
