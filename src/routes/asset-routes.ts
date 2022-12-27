import { Router } from 'express'
import YahooFinanceApi from '~/api/yahoo-finance-api'
import AssetController from '~/controller/asset-controller'
import AssetRepository from '~/repository/asset-repository'
import AddAssetUseCase from '~/usecases/add-asset-use-case'
import GetAssetBySymbolUseCase from '~/usecases/get-asset-by-symbol-use-case'
import GetAssetsUseCase from '~/usecases/get-assets-use-case'
import { adapt } from './route-adapter'

export const assetRoutes = Router()

const assetRepository: AssetRepository = new AssetRepository()
const yahooFinanceApi: YahooFinanceApi = new YahooFinanceApi()
const addAssetUseCase: AddAssetUseCase = new AddAssetUseCase(assetRepository, yahooFinanceApi)
const getAssetsUseCase: GetAssetsUseCase = new GetAssetsUseCase(assetRepository, yahooFinanceApi)
const getAssetBySymbolUseCase: GetAssetBySymbolUseCase = new GetAssetBySymbolUseCase(yahooFinanceApi)

const assetController: AssetController = new AssetController(
  addAssetUseCase,
  getAssetsUseCase,
  getAssetBySymbolUseCase
)

assetRoutes.post('/', adapt(
  assetController
  .addAsset
  .bind(assetController)
  ))
  
assetRoutes.get('/', adapt(
  assetController
  .getAssets
  .bind(assetController)
  ))
  
assetRoutes.get('/:symbol', adapt(
  assetController
  .getAsset
  .bind(assetController)
  ))