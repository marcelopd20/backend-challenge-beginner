import YahooFinanceApi from '~/api/yahoo-finance-api'
import YahooAssetDto from '~/dtos/yahoo-asset-dto'

export default class GetAssetBySymbolUseCase {
  // conecta com api
  public constructor(private readonly yahooFinanceApi: YahooFinanceApi) {}

  // realiza busca na api
  public getAsset(symbol: string): Promise<YahooAssetDto> {
    return this.yahooFinanceApi.getAsset(symbol)
  }
}
