import { Router } from 'express'
import YahooFinanceApi from '~/api/yahoo-finance-api'
import AssetController from '~/controller/asset-controller'
import GetAssetBySymbolUseCase from '~/usecases/get-asset-by-symbol-use-case'

export const assetRoutes = Router()
// chama api do Yahoo
const yahooFinanceApi: YahooFinanceApi = new YahooFinanceApi()
// chama caso de uso GetAssets , lista do usuario, passa repositorio e api como parametros
const getAssetBySymbolUseCase: GetAssetBySymbolUseCase = new GetAssetBySymbolUseCase(yahooFinanceApi)
// chama controller passando parametros das função chamadas
const assetController: AssetController = new AssetController(getAssetBySymbolUseCase)

// cria rota para getAsset
assetRoutes.get('/:symbol', assetController.getAsset.bind(assetController))
