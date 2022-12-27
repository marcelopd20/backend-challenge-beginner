import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { Environments } from '~/config/environment'
import YahooAssetDto from '~/dtos/yahoo-asset-dto'
import HttpException from '~/exceptions/http-exception'

export type YahooQuoteResponse = {
  quoteResponse: {
    result: YahooAssetDto[]
  }
}

export default class YahooFinanceApi {
  private readonly client: AxiosInstance

  public constructor() {
    this.client = axios.create({
      baseURL: 'https://yfapi.net/v6/finance',
      headers: {
        'X-API-KEY': Environments.YAHOO_FINANCE_API_KEY
      }
    })
  }

  public async getAsset(symbol: string): Promise<YahooAssetDto> {
    try {
      const response: AxiosResponse = await this.client.get('/quote', {
        params: {
          symbols: symbol
        }
      })
      const asset: YahooAssetDto = (response.data as YahooQuoteResponse)?.quoteResponse?.result[0]
      if (!asset) {
        throw new HttpException(404, `Asset '${symbol}' not found!`)
      }
      return {
        currency: asset?.currency,
        market: asset?.market,
        regularMarketPrice: asset?.regularMarketPrice,
        shortName: asset?.shortName,
        symbol: asset?.symbol,
        typeDisp: asset?.typeDisp
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.status ?? 500, error.message)
      }
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(500, `Fail to fetch asset ${symbol} on Yahoo Finance API`)
    }
  }
}
