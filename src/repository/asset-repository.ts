import { Collection, InsertOneResult, MongoClient } from 'mongodb'
import { Environments } from '~/config/environment'
import { mongoClient } from '~/config/mongo-config'
import AddAssetDto from '~/dtos/add-asset-dto'
import HttpException from '~/exceptions/http-exception'
import Asset from '~/model/asset'

export default class AssetRepository {
  private readonly assetCollection: Collection

  public constructor(private readonly client: MongoClient = mongoClient) {
    this.assetCollection = this.client.db(Environments.DB_ASSET_NAME).collection('assets')
  }

  public async addAsset(asset: AddAssetDto): Promise<Asset> {
    const result: InsertOneResult = await this.assetCollection.insertOne(asset)
    if (!result?.acknowledged) {
      throw new HttpException(422, 'Fail to save on database')
    }
    return { symbol: asset.symbol, userId: asset.userId, _id: result?.insertedId?.toString() }
  }

  public async findAssets(userId: string): Promise<Asset[]> {
    return (
      this.assetCollection
        .find({ userId })
        .map(({ _id, symbol, userId }) => ({ symbol, userId, _id: _id.toString() }))
        .toArray()
    )
  }
}
