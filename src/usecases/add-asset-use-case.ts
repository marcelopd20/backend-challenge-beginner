import YahooFinanceApi from '~/api/yahoo-finance-api'
import AddAssetDto from '~/dtos/add-asset-dto'
import AssetResponseDto from '~/dtos/asset-response-dto'
import YahooAssetDto from '~/dtos/yahoo-asset-dto'
import Asset from '~/model/asset'
import AssetRepository from '~/repository/asset-repository'

export default class AddAssetUseCase {
  public constructor(
    private readonly assetRepository: AssetRepository,
    private readonly yahooFinanceApi: YahooFinanceApi
  ) {}

  public async add(addAssetDto: AddAssetDto): Promise<AssetResponseDto> {
    const result: Asset = await this.assetRepository.addAsset(addAssetDto)
    const yahooAsset: YahooAssetDto = await this.yahooFinanceApi.getAsset(result.symbol)
    return { idAsset: result._id, ...yahooAsset }
  }
}
