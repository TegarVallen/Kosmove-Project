import { Barang, DummyProduct, DummyProductsResponse } from '../types/barang';

// External API publik (dummyjson). Kategori "furniture" dipakai sebagai
// contoh barang yang biasa dibawa saat pindahan kos.
const URL_BARANG =
  'https://dummyjson.com/products/category/furniture?limit=8&select=title,description,category,weight,thumbnail';

// Ubah data mentah API -> object sesuai interface Barang
const keBarang = (item: DummyProduct): Barang => ({
  id: item.id,
  nama: item.title,
  deskripsi: item.description,
  kategori: item.category,
  beratKg: item.weight,
  thumbnail: item.thumbnail,
});

// Promise dibuat manual + .then() + resolve() + reject()
export function getBarang(): Promise<Barang[]> {
  return new Promise<Barang[]>((resolve, reject) => {
    fetch(URL_BARANG) // fetch = fungsi async bawaan (pre-built)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Gagal mengambil data barang (status ${response.status})`);
        }
        return response.json();
      })
      .then((json: DummyProductsResponse) => {
        resolve(json.products.map(keBarang)); // berhasil
      })
      .catch((error: Error) => {
        reject(error); // gagal (internet mati, server error, dll)
      });
  });
}
