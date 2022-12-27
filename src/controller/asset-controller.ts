import { Request, Response } from 'express'
import AddAssetDto from '~/dtos/add-asset-dto'
import AssetResponseDto from '~/dtos/asset-response-dto'
import YahooAssetDto from '~/dtos/yahoo-asset-dto'
import HttpException from '~/exceptions/http-exception'
import AddAssetUseCase from '~/usecases/add-asset-use-case'
import GetAssetBySymbolUseCase from '~/usecases/get-asset-by-symbol-use-case'
import GetAssetsUseCase from '~/usecases/get-assets-use-case'

export default class AssetController {
  public constructor(
    private readonly addAssetUseCase: AddAssetUseCase,
    private readonly getAssetsUseCase: GetAssetsUseCase,
    private readonly getAssetBySymbolUseCase: GetAssetBySymbolUseCase
  ) {}

  // 1. Usuário adiciona um ativo em sua lista de acompanhamento.
  public async addAsset(request: Request, response: Response): Promise<void> {
    const addAssetDto: AddAssetDto = new AddAssetDto(request.body?.userId, request.body?.symbol)
    const result: AssetResponseDto = await this.addAssetUseCase.add(addAssetDto)
    response.status(200).json(result)
  }

  // 2. Usuário consulta sua lista de acompanhamento.
  public async getAssets(request: Request, response: Response) {
    const userId: string = request?.query?.userId as string
    if (!userId) {
      throw new HttpException(400, "Missing required 'userId' query param")
    }
    const result: AssetResponseDto[] = await this.getAssetsUseCase.getAssets(userId)
    response.status(200).json(result)
  }

  // 3. Usuário consulta a cotação de um ativo.
  public async getAsset(request: Request, response: Response) {
    const symbol = request?.params?.symbol
    const result: YahooAssetDto = await this.getAssetBySymbolUseCase.getAsset(symbol)
    response.status(200).json(result)
  }
}
