// estende classe de error
export default class HttpException extends Error {
  // recebe código de erro
  public readonly statusCode: number

  // constroi exceção. numero do erro e mensagem de erro
  public constructor(statusCode: number, message: string) {
    // message da classe error
    super(message)
    this.statusCode = statusCode
  }
}
