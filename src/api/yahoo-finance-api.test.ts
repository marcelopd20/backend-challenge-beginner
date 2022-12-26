import nock from 'nock'
import YahooAssetDto from '~/dtos/yahoo-asset-dto'
import { yahooAssetDto } from '~/tests/mocks/yahoo-asset-dto-mocks'
import YahooFinanceApi, { YahooQuoteResponse } from './yahoo-finance-api'
import HttpException from '~/exceptions/http-exception'

// conecta com api
const yahooFinanceApi = new YahooFinanceApi()
// passa symbol para test
const symbol: string = 'TEST'
// testa getAsset
describe('getAsset()', () => {
  // testa sucesso
  test('Sucess', async () => {
    // arrange
    // passa resultado esperado
    const expectedAsset: YahooAssetDto = yahooAssetDto
    // passa json esperado
    const expectedYahooResponse: YahooQuoteResponse = {
      quoteResponse: {
        result: [expectedAsset]
      }
    }
    // mocka api com nock, /quote?symbols=symbol espera status 200 e resposta
    nock('https://yfapi.net/v6/finance')
      .get('/quote')
      .query({ symbols: symbol })
      .reply(200, expectedYahooResponse)
    // act
    // testa mmétodo getAsset passando string
    const response: YahooAssetDto = await yahooFinanceApi.getAsset(symbol)
    // assert
    // verifica chave/valor aguardado
    expect(response.currency).toStrictEqual(expectedAsset.currency)
    expect(response.market).toStrictEqual(expectedAsset.market)
    expect(response.regularMarketPrice).toStrictEqual(expectedAsset.regularMarketPrice)
    expect(response.shortName).toStrictEqual(expectedAsset.shortName)
    expect(response.symbol).toStrictEqual(expectedAsset.symbol)
    expect(response.typeDisp).toStrictEqual(expectedAsset.typeDisp)
  })
  // simula retorno vazio
  test('Yahoo finance api returning an empty result', async () => {
    // arrange
    const expectedYahooResponse: YahooQuoteResponse = {
      quoteResponse: {
        result: []
      }
    }
    // mocka api com nock, /quote?symbols=symbol espera status 200 e resposta
    nock('https://yfapi.net/v6/finance')
      .get('/quote')
      .query({ symbols: symbol })
      .reply(200, expectedYahooResponse)
    // act
    // verifica resposta
    const responseCb = () => yahooFinanceApi.getAsset(symbol)
    // assert
    // valida exceção esperada pelo método
    await expect(responseCb).rejects.toThrowError(HttpException)
  })
})
