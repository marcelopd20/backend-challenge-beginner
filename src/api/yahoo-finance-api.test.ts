import nock from 'nock'
import YahooAssetDto from '~/dtos/yahoo-asset-dto'
import { yahooAssetDto } from '~/tests/mocks/yahoo-asset-dto-mocks'
import YahooFinanceApi, { YahooQuoteResponse } from './yahoo-finance-api'
import HttpException from '~/exceptions/http-exception'

const yahooFinanceApi = new YahooFinanceApi()

const symbol: string = 'TEST'

describe('getAsset()', () => {
  test('Sucess', async () => {
    // arrange
    const expectedAsset: YahooAssetDto = yahooAssetDto
    const expectedYahooResponse: YahooQuoteResponse = {
      quoteResponse: {
        result: [expectedAsset]
      }
    }
    nock('https://yfapi.net/v6/finance')
      .get('/quote')
      .query({ symbols: symbol })
      .reply(200, expectedYahooResponse)
    // act
    const response: YahooAssetDto = await yahooFinanceApi.getAsset(symbol)
    // assert
    expect(response.currency).toStrictEqual(expectedAsset.currency)
    expect(response.market).toStrictEqual(expectedAsset.market)
    expect(response.regularMarketPrice).toStrictEqual(expectedAsset.regularMarketPrice)
    expect(response.shortName).toStrictEqual(expectedAsset.shortName)
    expect(response.symbol).toStrictEqual(expectedAsset.symbol)
    expect(response.typeDisp).toStrictEqual(expectedAsset.typeDisp)
  })

  test('Yahoo finance api returning an empty result', async () => {
    // arrange
    const expectedYahooResponse: YahooQuoteResponse = {
      quoteResponse: {
        result: []
      }
    }
    
    nock('https://yfapi.net/v6/finance')
      .get('/quote')
      .query({ symbols: symbol })
      .reply(200, expectedYahooResponse)
    // act
    const responseCb = () => yahooFinanceApi.getAsset(symbol)
    // assert
    await expect(responseCb).rejects.toThrowError(HttpException)
  })
})
