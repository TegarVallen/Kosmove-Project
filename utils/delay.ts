// Custom async helper: menunggu selama `ms` milidetik
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
