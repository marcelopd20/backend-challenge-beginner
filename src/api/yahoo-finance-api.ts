import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { Environments } from '~/config/environment'
import YahooAssetDto from '~/dtos/yahoo-asset-dto'
import HttpException from '~/exceptions/http-exception'

// tipo de resposta que recebe
export type YahooQuoteResponse = {
  quoteResponse: {
    result: YahooAssetDto[]
  }
}

// classe do YahooFinanceApi
export default class YahooFinanceApi {
  private readonly client: AxiosInstance

  // conecta com api pelo axios
  public constructor() {
    this.client = axios.create({
      baseURL: 'https://yfapi.net/v6/finance',
      headers: {
        'X-API-KEY': Environments.YAHOO_FINANCE_API_KEY
      }
    })
  }

  // método de busca na API
  public async getAsset(symbol: string): Promise<YahooAssetDto> {
    try {
      // faz get na conexao client, passando symbol para parametro
      const response: AxiosResponse = await this.client.get('/quote', {
        params: {
          symbols: symbol
        }
      })
      // pega primeiro item da lista result
      const asset: YahooAssetDto = (response.data as YahooQuoteResponse)?.quoteResponse?.result[0]
      // em caso de return com lista vazia, false, passa para erro
      if (!asset) {
        throw new HttpException(404, `Asset '${symbol}' not found!`)
      }
      // retorna dados normalizados encntrados
      return {
        currency: asset?.currency,
        market: asset?.market,
        regularMarketPrice: asset?.regularMarketPrice,
        shortName: asset?.shortName,
        symbol: asset?.symbol,
        typeDisp: asset?.typeDisp
      }
    } catch (error: unknown) {
      // passa exceção ou erro interno, se problema com client
      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.status || 500, error.message)
      }
      // passa erro
      if (error instanceof HttpException) {
        throw error
      }
      // se não houver lista, symbol é recusado
      throw new HttpException(500, `Fail to fetch asset ${symbol} on Yahoo Finance API`)
    }
  }
}
