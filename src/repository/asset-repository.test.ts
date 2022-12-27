import { MongoClient, ObjectId } from 'mongodb'
import HttpException from '~/exceptions/http-exception'
import Asset from '~/model/asset'
import { addAssetDtoMock, getAssetMock } from '~/tests/mocks/asset-mock'
import AssetRepository from './asset-repository'

const insertOneMock = jest.fn()
const findMock = jest.fn()

const mongoClient: MongoClient = {
  db: jest.fn().mockReturnValue({
    collection: jest.fn().mockReturnValue({
      insertOne: insertOneMock,
      find: findMock
    })
  })
} as unknown as jest.Mocked<MongoClient>

const repository: AssetRepository = new AssetRepository(mongoClient)

beforeEach(() => {
  jest.clearAllMocks()
})

describe('addAsset()', () => {
  test('Sucess', async () => {
    // arrange
    const expectedInsertedId: ObjectId = new ObjectId()
    const asset: Asset = getAssetMock(expectedInsertedId)
    insertOneMock.mockResolvedValueOnce({
      insertedId: expectedInsertedId,
      acknowledged: true
    })
    // act
    const result: Asset = await repository.addAsset(addAssetDtoMock)
    // assert
    expect(insertOneMock).toHaveBeenCalledTimes(1)
    expect(result._id).toStrictEqual(asset._id)
    expect(result.symbol).toStrictEqual(asset.symbol)
    expect(result.userId).toStrictEqual(asset.userId)
  })

  test('Fail to save', async () => {
    // arrange
    jest.mocked(insertOneMock).mockResolvedValueOnce({
      acknowledged: false
    })
    // act
    const resultCb = () => repository.addAsset(addAssetDtoMock)
    // assert
    await expect(resultCb).rejects.toThrowError(HttpException)
    expect(insertOneMock).toHaveBeenCalledTimes(1)
  })
})

describe('findAssets()', () => {
  test('Return a valid list', async () => {
    // arrange
    const asset: Asset = getAssetMock()
    const cursorMock = {
      map: jest.fn().mockReturnValue({
        toArray: jest.fn().mockResolvedValue([asset])
      })
    }
    findMock.mockReturnValue(cursorMock)
    // act
    const result: Asset[] = await repository.findAssets(addAssetDtoMock.userId)
    // arrange
    expect(findMock).toHaveBeenCalledTimes(1)
    expect(result.length).toBeGreaterThanOrEqual(1)
  })
})
