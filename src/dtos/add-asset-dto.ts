import HttpException from '~/exceptions/http-exception'
// cria classe para validar dados transferidos
export default class AddAssetDto {
  // constroi classe passando parametros e chamando método validador
  public constructor(
    public readonly userId: string, 
    public readonly symbol: string
    ) {
    this.validateField(symbol, 'symbol')
    this.validateField(userId, 'userId')
  }

  // método que realiza validação
  public validateField(field: string, fieldName: string): void {
    if (!field?.trim()) {
      // entra na exceção do aguardado, informado como inválido
      throw new HttpException(412, `Field '${fieldName}' is blank or null`)
    }
  }
}
