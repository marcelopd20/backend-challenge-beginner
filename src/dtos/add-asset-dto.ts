import HttpException from '~/exceptions/http-exception'

export default class AddAssetDto {
  public constructor(
    public readonly userId: string, 
    public readonly symbol: string
    ) {
    this.validateField(symbol, 'symbol')
    this.validateField(userId, 'userId')
  }

  public validateField(field: string, fieldName: string): void {
    if (!field?.trim()) {
      throw new HttpException(412, `Field '${fieldName}' is blank or null`)
    }
  }
}
