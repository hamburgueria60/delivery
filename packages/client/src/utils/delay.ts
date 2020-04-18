export default function delay(ms: number): Promise<number> {
  return new Promise((resolve): number => setTimeout(resolve, ms))
}
