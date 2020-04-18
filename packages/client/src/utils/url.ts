interface Options {
  keep?: boolean
}

export function consumeURLParameter(paramName: string, options: Options = {}): string | boolean {
  const searchParams = new URLSearchParams(window.location.search)
  const value = searchParams.get(paramName) || searchParams.has(paramName)

  if (!options.keep) {
    searchParams.delete(paramName)

    if (history.replaceState) {
      const searchString = searchParams.toString().length > 0 ? `?${searchParams.toString()}` : ''
      const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${searchString}${window.location.hash}`
      history.replaceState(null, '', newUrl)
    }
  }

  return value
}
