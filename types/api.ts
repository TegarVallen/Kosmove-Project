// Bentuk standar balasan dari "server" (dipakai services/api.ts)
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}
