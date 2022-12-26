import { Router } from 'express'
import YahooFinanceApi from '~/api/yahoo-finance-api'
import AssetController from '~/controller/asset-controller'
import AssetRepository from '~/repository/asset-repository'
import AddAssetUseCase from '~/usecases/add-asset-use-case'
import GetAssetBySymbolUseCase from '~/usecases/get-asset-by-symbol-use-case'
import GetAssetsUseCase from '~/usecases/get-assets-use-case'
import { adapt } from './route-adapter'

export const assetRoutes = Router()
//chama repositorio
const assetRepository: AssetRepository = new AssetRepository()
// chama api do Yahoo
const yahooFinanceApi: YahooFinanceApi = new YahooFinanceApi()
//chama AddAsset, passa repositorio e api
const addAssetUseCase: AddAssetUseCase = new AddAssetUseCase(assetRepository, yahooFinanceApi)
//chama GetAssets, lista do usuario, passa repositorio e api
const getAssetsUseCase: GetAssetsUseCase = new GetAssetsUseCase(assetRepository, yahooFinanceApi)
// chama caso de uso GetAsset , lista do usuario, passa repositorio e api como parametros
const getAssetBySymbolUseCase: GetAssetBySymbolUseCase = new GetAssetBySymbolUseCase(yahooFinanceApi)
// chama controller passando parametros das função chamadas
const assetController: AssetController = new AssetController(addAssetUseCase, getAssetsUseCase, getAssetBySymbolUseCase)

//cria rota para addAsset
assetRoutes.post('/', adapt(assetController.addAsset.bind(assetController)))
//cria rota para getAssets, lista do usuário
assetRoutes.get('/', adapt(assetController.getAssets.bind(assetController)))
// cria rota para getAsset
assetRoutes.get('/:symbol', adapt(assetController.getAsset.bind(assetController)))
