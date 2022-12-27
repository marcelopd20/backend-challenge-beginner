import YahooFinanceApi from '~/api/yahoo-finance-api'
import AssetResponseDto from '~/dtos/asset-response-dto'
import YahooAssetDto from '~/dtos/yahoo-asset-dto'
import Asset from '~/model/asset'
import AssetRepository from '~/repository/asset-repository'

export default class GetAssetsUseCase {
  public constructor(
    private readonly assetRepository: AssetRepository,
    private readonly yahooFinanceApi: YahooFinanceApi
  ) {}

  public async getAssets(userId: string): Promise<AssetResponseDto[]> {
    const result: Asset[] = await this.assetRepository.findAssets(userId)
    const yahooAssets: Promise<AssetResponseDto>[] = result.map(
      async (asset: Asset): Promise<AssetResponseDto> => {
        const yahooAsset: YahooAssetDto = await this.yahooFinanceApi.getAsset(asset.symbol)
        return { idAsset: asset._id, ...yahooAsset }
      }
    )
    return Promise.all(yahooAssets)
  }
}
