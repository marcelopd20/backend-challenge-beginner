export default class HttpException extends Error {
  public readonly statusCode: number

  public constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
  }
}
