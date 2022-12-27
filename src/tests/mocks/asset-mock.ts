import { randomUUID } from 'crypto'
import { ObjectId } from 'mongodb'
import Asset from '~/model/asset'
import AddAssetDto from '~/dtos/add-asset-dto'

const defaultUserId: string = randomUUID()

export function getAssetMock(id?: ObjectId): Asset {
  return {
    _id: id?.toString() ?? new ObjectId().toString(),
    symbol: 'test',
    userId: defaultUserId
  }
}

export const addAssetDtoMock: AddAssetDto = {
  symbol: 'test',
  userId: defaultUserId
} as AddAssetDto
