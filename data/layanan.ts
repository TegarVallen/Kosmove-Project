import { Layanan } from '../types/layanan';

// "Database" tiruan di sisi server. Aplikasi TIDAK membaca ini langsung,
// tapi lewat services/api.ts (disimulasikan seperti fetch ke server).
export const daftarLayanan: Layanan[] = [
  {
    id: 1,
    nama: 'Pindahan Kos Reguler',
    deskripsi: 'Angkut barang satu kamar kos (kasur lipat, lemari kecil, koper, dan kardus) ke kos baru dalam satu kota.',
    harga: 150000,
  },
  {
    id: 2,
    nama: 'Angkut Barang Besar',
    deskripsi: 'Khusus kasur, lemari, meja belajar, atau kulkas mini. Termasuk 2 petugas dan kendaraan pickup.',
    harga: 300000,
  },
  {
    id: 3,
    nama: 'Jasa Packing',
    deskripsi: 'Petugas membantu membungkus dan menata barang agar aman selama perjalanan. Bahan packing sudah termasuk.',
    harga: 75000,
  },
  {
    id: 4,
    nama: 'Antar Barang Antar Kos',
    deskripsi: 'Kirim barang titipan teman kos ke kos lain. Cocok untuk paket kecil dan titipan sehari.',
    harga: 35000,
  },
];

// Contoh: 150000 -> "Rp 150.000"
export const formatRupiah = (nilai: number): string =>
  'Rp ' + nilai.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
