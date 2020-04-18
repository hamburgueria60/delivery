class Locale {
  private locale = 'pt-BR'

  private mapCurrencyByLocale: Record<string, string> = {
    'pt-BR': 'BRL',
  }

  public getLocale(): string {
    return this.locale
  }

  public getCurrency(): string {
    return this.mapCurrencyByLocale[this.getLocale()]
  }

  public async setLocale(locale: string): Promise<void> {
    this.locale = locale
  }
}

export default new Locale()
