import { randomUUID } from 'crypto'
import { ObjectId } from 'mongodb'
import Asset from '~/model/asset'
import AddAssetDto from '~/dtos/add-asset-dto'

// cria id com função de gerar id rand
const defaultUserId: string = randomUUID()
// função que retorna mock de consulta de bd contendo id, symbol userId
export function getAssetMock(id?: ObjectId): Asset {
  return {
    _id: id?.toString() || new ObjectId().toString(),
    symbol: 'test',
    userId: defaultUserId
  }
}
// ciar obj mocador válido para adiconar uma asset e força tipo
export const addAssetDtoMock: AddAssetDto = {
  symbol: 'test',
  userId: defaultUserId
  // força tipagem válida
} as AddAssetDto
