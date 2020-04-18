export default class RequestError extends Error {
  public id: string

  public cause: string

  public operationName: string

  public constructor({
    id,
    operationName,
    name,
    message,
    cause,
  }: {
    id: string
    operationName: string
    name: string
    message: string
    cause: string
  }) {
    super()
    this.name = name
    this.message = message
    this.cause = cause
    this.id = id
    this.operationName = operationName
  }
}
