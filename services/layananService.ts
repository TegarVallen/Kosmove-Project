import { Layanan } from '../types/layanan';
import { fetchLayanan, fetchLayananById } from './api';

// Versi .then(): ambil isi `data` dari ApiResponse
export function getLayanan(): Promise<Layanan[]> {
  return fetchLayanan().then((response) => response.data);
}

// Versi async/await: hasilnya sama, cara penulisannya beda
export async function getLayananById(id: number): Promise<Layanan> {
  const response = await fetchLayananById(id);
  return response.data;
}
