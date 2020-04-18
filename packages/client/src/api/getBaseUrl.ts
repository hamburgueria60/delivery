const getBaseUrl = (): string => {
  return `${window.location.protocol}//${window.location.host}/graphql`
}

export default getBaseUrl
