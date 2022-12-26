import HttpException from '~/exceptions/http-exception'
import { addAssetDtoMock } from '~/tests/mocks/asset-mock'
import AddAssetDto from './add-asset-dto'

// método addAssetDto valida parametros no addasset
describe('AddAssetDto()', () => {
  // define o que sera falso
  const emptyStringValues: unknown[] = [undefined, null, '', '  ']
  // arrange
  // cria mocando clsse addAssetDto, e moca userid symbol
  const { symbol, userId }: AddAssetDto = addAssetDtoMock
  // testa sucesso
  test('Sucess', () => {
    // act
    // gera result eserado
    const result: AddAssetDto = new AddAssetDto(userId, symbol)
    // assert
    // valida os resultados
    expect(result.symbol).toStrictEqual(symbol)
    expect(result.userId).toStrictEqual(userId)
  })
  // ctia tipo para validar método validate
  type ValidateFieldTestArgs = {
    validateSymbol?: boolean
    validateUserId?: boolean
  }
  // declara teste para validador
  function validateFieldTest({ validateSymbol, validateUserId }: ValidateFieldTestArgs): void {
    // act
    // tipo vazio
    const resultValues = emptyStringValues.map(
      (item: unknown) => () =>
        new AddAssetDto(
          validateSymbol ? (item as string) : symbol,
          validateUserId ? (item as string) : userId
        )
    )
    // assert
    // itera por validador
    resultValues.forEach((result) => {
      // passa validador de test
      expect(result).toThrowError(HttpException)
    })
  }
  // testa variaveis
  test("Attribute 'symbol' is blank or null", () => validateFieldTest({ validateSymbol: true }))
  test("Attribute 'userId' is blank or null", () => validateFieldTest({ validateUserId: true }))
})
