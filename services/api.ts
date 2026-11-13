import { daftarLayanan } from '../data/layanan';
import { ApiResponse } from '../types/api';
import { Layanan } from '../types/layanan';
import { delay } from '../utils/delay';

// 1) Custom async function (pakai async/await + delay buatan sendiri)
export async function fetchLayanan(): Promise<ApiResponse<Layanan[]>> {
  await delay(800); // pura-pura server lambat
  return {
    success: true,
    data: daftarLayanan,
    message: 'Berhasil mengambil data layanan',
  };
}

// 2) Promise dibuat manual: resolve() kalau berhasil, reject() kalau gagal
export function fetchLayananById(id: number): Promise<ApiResponse<Layanan>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const ditemukan = daftarLayanan.find((item) => item.id === id);

      if (ditemukan) {
        resolve({
          success: true,
          data: ditemukan,
          message: 'Berhasil mengambil detail layanan',
        });
      } else {
        reject(new Error(`Layanan dengan id ${id} tidak ditemukan`));
      }
    }, 600);
  });
}
