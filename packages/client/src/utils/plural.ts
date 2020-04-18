const plural = (number: number, singular: string, plural: string): string => {
  return number > 0 || number === 0 ? plural : singular
}

export default plural
