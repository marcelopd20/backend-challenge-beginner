import YahooFinanceApi from '~/api/yahoo-finance-api'
import AssetResponseDto from '~/dtos/asset-response-dto'
import YahooAssetDto from '~/dtos/yahoo-asset-dto'
import Asset from '~/model/asset'
import AssetRepository from '~/repository/asset-repository'

// cria obj getAssets
export default class GetAssetsUseCase {
  // cria atribuições da classe
  public constructor(
    // instancia interação com repositorio
    private readonly assetRepository: AssetRepository,
    // instance interação com Yahoo Finance Api
    private readonly yahooFinanceApi: YahooFinanceApi
  ) {}

  // método de busca a lista de assets de um usuário
  public async getAssets(userId: string): Promise<AssetResponseDto[]> {
    // utiliza a função findAssets, retornando lista de ativos
    const result: Asset[] = await this.assetRepository.findAssets(userId)
    // passa dados dos ativos da lista de preferência
    const yahooAssets: Promise<AssetResponseDto>[] = result.map(
      // busca assets da lista na api pelo symbol
      async (asset: Asset): Promise<AssetResponseDto> => {
        // retorna dados da api, com json de informações de ativo do usuário
        const yahooAsset: YahooAssetDto = await this.yahooFinanceApi.getAsset(asset.symbol)
        return { idAsset: asset._id, ...yahooAsset }
      }
    )
    // retorna lista de assets
    return Promise.all(yahooAssets)
  }
}
