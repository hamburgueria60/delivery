export function getRawPhone(prettyPhone: string): string {
  return prettyPhone.replace(/-|\(|\)|\s/g, '')
}
