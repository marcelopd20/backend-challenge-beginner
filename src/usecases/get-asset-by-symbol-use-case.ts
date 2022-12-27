import YahooFinanceApi from '~/api/yahoo-finance-api'
import YahooAssetDto from '~/dtos/yahoo-asset-dto'

export default class GetAssetBySymbolUseCase {
  public constructor(private readonly yahooFinanceApi: YahooFinanceApi) {}

  public getAsset(symbol: string): Promise<YahooAssetDto> {
    return this.yahooFinanceApi.getAsset(symbol)
  }
}
