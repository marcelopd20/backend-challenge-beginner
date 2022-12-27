import HttpException from '~/exceptions/http-exception'
import { addAssetDtoMock } from '~/tests/mocks/asset-mock'
import AddAssetDto from './add-asset-dto'

describe('AddAssetDto()', () => {
  const emptyStringValues: unknown[] = [undefined, null, '', '  ']
  // arrange
  const { symbol, userId }: AddAssetDto = addAssetDtoMock
  test('Sucess', () => {
    // act
    const result: AddAssetDto = new AddAssetDto(userId, symbol)
    // assert
    expect(result.symbol).toStrictEqual(symbol)
    expect(result.userId).toStrictEqual(userId)
  })
  type ValidateFieldTestArgs = {
    validateSymbol?: boolean
    validateUserId?: boolean
  }
  function validateFieldTest({ validateSymbol, validateUserId }: ValidateFieldTestArgs): void {
    // act
    const resultValues = emptyStringValues.map(
      (item: unknown) => () =>
        new AddAssetDto(
          validateSymbol ? (item as string) : symbol,
          validateUserId ? (item as string) : userId
        )
    )
    
    // assert
    resultValues.forEach((result) => {
      expect(result).toThrowError(HttpException)
    })
  }
  test("Attribute 'symbol' is blank or null", () => validateFieldTest({ validateSymbol: true }))
  test("Attribute 'userId' is blank or null", () => validateFieldTest({ validateUserId: true }))
})
