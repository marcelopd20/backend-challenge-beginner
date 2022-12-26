import { Request, Response } from 'express'
import YahooAssetDto from '~/dtos/yahoo-asset-dto'
import GetAssetBySymbolUseCase from '~/usecases/get-asset-by-symbol-use-case'

export default class AssetController {
  public constructor(private readonly getAssetBySymbolUseCase: GetAssetBySymbolUseCase) {}

  // 1. Usuário adiciona um ativo em sua lista de acompanhamento.
  // public addAsset() {}
  // construtor passa atributor

  // 2. Usuário consulta sua lista de acompanhamento.
  public async getAsset(request: Request, response: Response) {
    // recebe symbol
    const symbol = request?.params?.symbol
    // recebe dados da asset(symbol, currency, price)
    const result: YahooAssetDto = await this.getAssetBySymbolUseCase.getAsset(symbol)
    response.status(200).json(result)
  }

  // 3. Usuário consulta a cotação de um ativo.
  // public getAsset() {}
}
