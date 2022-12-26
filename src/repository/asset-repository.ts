import { Collection, InsertOneResult, MongoClient } from 'mongodb'
import { Environments } from '~/config/environment'
import { mongoClient } from '~/config/mongo-config'
import AddAssetDto from '~/dtos/add-asset-dto'
import HttpException from '~/exceptions/http-exception'
import Asset from '~/model/asset'

// cria classe para asset no repositório
export default class AssetRepository {
  // tipa coleção para mongodb
  private readonly assetCollection: Collection

  // construtor do método, passa atributo cliente do bd
  public constructor(private readonly client: MongoClient = mongoClient) {
    // conect ao banco assets, na coleção/tablea assets
    this.assetCollection = this.client.db(Environments.DB_ASSET_NAME).collection('assets')
  }

  // adiciona Asset no Banco, passando o registro no banco, id, userId e asset
  public async addAsset(asset: AddAssetDto): Promise<Asset> {
    // conecta com db e adiciona coleção ao bd
    const result: InsertOneResult = await this.assetCollection.insertOne(asset)
    // valida resultado
    if (!result?.acknowledged) {
      // passa exceção
      throw new HttpException(422, 'Fail to save on database')
    }
    // em caso de sucesso passa obj tipo asset(symbol, userid, id)
    return { symbol: asset.symbol, userId: asset.userId, _id: result?.insertedId?.toString() }
  }

  // busca assets no de lista do usuário
  public async findAssets(userId: string): Promise<Asset[]> {
    // retona coleção
    return (
      this.assetCollection
        // busca id do usuário no banco
        .find({ userId })
        // itera sobre todos registros do bd
        .map(({ _id, symbol, userId }) => ({ symbol, userId, _id: _id.toString() }))
        // passa para array
        .toArray()
    )
  }
}
