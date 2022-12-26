import { MongoClient, ObjectId } from 'mongodb'
import HttpException from '~/exceptions/http-exception'
import Asset from '~/model/asset'
import { addAssetDtoMock, getAssetMock } from '~/tests/mocks/asset-mock'
import AssetRepository from './asset-repository'

// mocka funções do bd
const insertOneMock = jest.fn()
const findMock = jest.fn()

// mocka bd
const mongoClient: MongoClient = {
  // passa banco e retorno de coleção com funções mockadas
  db: jest.fn().mockReturnValue({
    collection: jest.fn().mockReturnValue({
      insertOne: insertOneMock,
      find: findMock
    })
  })
  // força tipagem do mongoclient
} as unknown as jest.Mocked<MongoClient>
// cria repositório no bd passando bd mockado
const repository: AssetRepository = new AssetRepository(mongoClient)
// limpa mocks
beforeEach(() => {
  jest.clearAllMocks()
})
// testa addAsset
describe('addAsset()', () => {
  // testa suceso da função, retorna tipo Asset
  test('Sucess', async () => {
    // arrange
    // moca objid
    const expectedInsertedId: ObjectId = new ObjectId()
    // moca asset
    const asset: Asset = getAssetMock(expectedInsertedId)
    // moca insertone chamando uma unica vez, passando id e aprovando
    insertOneMock.mockResolvedValueOnce({
      insertedId: expectedInsertedId,
      acknowledged: true
    })
    // act
    // cria addAsset passando mock
    const result: Asset = await repository.addAsset(addAssetDtoMock)
    // assert
    // chama função mocada, testa retorno
    expect(insertOneMock).toHaveBeenCalledTimes(1)
    // testa retorno da addAsset, obj { symbol, id, userId }
    expect(result._id).toStrictEqual(asset._id)
    expect(result.symbol).toStrictEqual(asset.symbol)
    expect(result.userId).toStrictEqual(asset.userId)
  })
  // testa Exceção de addAsset()
  test('Fail to save', async () => {
    // arrange
    // moca insertone chamando uma unica vez, passa reconhecimento falso
    jest.mocked(insertOneMock).mockResolvedValueOnce({
      acknowledged: false
    })
    // act
    // callback da funçao
    const resultCb = () => repository.addAsset(addAssetDtoMock)
    // assert
    // chama função mocada, testa retorno de erro
    await expect(resultCb).rejects.toThrowError(HttpException)
    // testa função
    expect(insertOneMock).toHaveBeenCalledTimes(1)
  })
})

describe('findAssets()', () => {
  // testa retorno de lista com um retorno
  test('Return a valid list', async () => {
    // arrange
    // passa asset mocada
    const asset: Asset = getAssetMock()
    const cursorMock = {
      // moca asset
      map: jest.fn().mockReturnValue({
        // passa para array asset mocada
        toArray: jest.fn().mockResolvedValue([asset])
      })
    }
    // moca valor de retorno
    findMock.mockReturnValue(cursorMock)
    // act
    // moca array de assets de um id mocado
    const result: Asset[] = await repository.findAssets(addAssetDtoMock.userId)
    // arrange
    // testa função
    expect(findMock).toHaveBeenCalledTimes(1)
    // testa retorno
    expect(result.length).toBeGreaterThanOrEqual(1)
  })
})
