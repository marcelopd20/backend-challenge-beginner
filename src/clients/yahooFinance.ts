import { InternalError } from '@src/util/errors/internal-error';
import * as HTTPUtil from '@src/util/request';
import config, { IConfig } from 'config';
import CacheUtil from '@src/util/cache';
import logger from '@src/logger';

export interface YahooFinanceResult {
    readonly symbol: string;
    readonly language: string;
    readonly region: string;
    readonly quoteType: string;
    readonly typeDisp: string;
    readonly quoteSourceName: string;
    readonly triggerable: boolean;
    readonly customPriceAlertConfidence: string;
    readonly currency: string;
    readonly marketState: string;
    readonly regularMarketChange: number;
    readonly regularMarketTime: number;
    readonly regularMarketDayHigh: number;
    readonly regularMarketDayRange: string;
    readonly regularMarketDayLow: number;
    readonly regularMarketVolume: number;
    readonly regularMarketPreviousClose: number;
    readonly bid: number;
    readonly ask: number;
    readonly bidSize: number;
    readonly askSize: number;
    readonly fullExchangeName: string;
    readonly financialCurrency: string;
    readonly regularMarketOpen: number;
    readonly averageDailyVolume3Month: number;
    readonly averageDailyVolume10Day: number;
    readonly fiftyTwoWeekLowChange: number;
    readonly fiftyTwoWeekLowChangePercent:number;
    readonly fiftyTwoWeekRange: string;
    readonly fiftyTwoWeekHighChange: number;
    readonly fiftyTwoWeekHighChangePercent: number;
    readonly fiftyTwoWeekLow: number;
    readonly fiftyTwoWeekHigh: number;
    readonly earningsTimestamp: number;
    readonly earningsTimestampStart: number;
    readonly earningsTimestampEnd: number;
    readonly trailingAnnualDividendRate: number;
    readonly trailingPE: number;
    readonly trailingAnnualDividendYield: number;
    readonly epsTrailingTwelveMonths: number;
    readonly sharesOutstanding: number;
    readonly bookValue: number;
    readonly fiftyDayAverage: number;
    readonly fiftyDayAverageChange: number;
    readonly fiftyDayAverageChangePercent: number;
    readonly twoHundredDayAverage: number;
    readonly twoHundredDayAverageChange: number;
    readonly twoHundredDayAverageChangePercent: number;
    readonly marketCap: number;
    readonly priceToBook: number;
    readonly sourceInterval: number;
    readonly exchangeDataDelayedBy: number;
    readonly exchange: string;
    readonly shortName: string;
    readonly longName: string;
    readonly messageBoardId: string;
    readonly exchangeTimezoneName: string;
    readonly exchangeTimezoneShortName: string;
    readonly gmtOffSetMilliseconds: number;
    readonly market: string;
    readonly esgPopulated: boolean;
    readonly regularMarketChangePercent: number;
    readonly regularMarketPrice: number;
    readonly firstTradeDateMilliseconds: number;
    readonly priceHint: number;
    readonly tradeable: boolean;
    readonly cryptoTradeable: boolean;
}

export interface  YahooFinanceAssetResponse {
    result: [YahooFinanceResult];
    error: Error;
}

export interface  YahooFinanceAssetQuoteResponse {
    quoteResponse: YahooFinanceAssetResponse;
}

export interface AssetName{
    symbol: string;
    regularMarketPrice: number;                
    currency: string;
    typeDisp: string;
    market: string;
    shortName: string;
}

export class YahooFinanceUnexpectedResponseError extends InternalError {
    constructor(message: string) {
      super(message);
    }
}

export class ClientRequestError extends InternalError {
    constructor(message: string) {
        const internalMessage = 
            `Unexpected error when trying to communicate to YahooFinance`;
        super(`${internalMessage}: ${message}`)
    }
}

export class YahooFinanceResponseError extends InternalError {
    constructor(message: string) {
      const internalMessage =
        'Unexpected error returned by the YahooFinance service';
      super(`${internalMessage}: ${message}`);
    }
  }

const yahooFinanceResourceConfig: IConfig = config.get(
    'App.resources.YahooFinance'
);

export class YahooFinance {
    readonly yahooFinanceAPIRegion = 'BR';
    readonly yahooFinanceAPILang = 'pt-BR';

    constructor(
        protected request = new HTTPUtil.Request(),
        protected cacheUtil = CacheUtil

        ) {};

    public async fetchName(asset: string): Promise<AssetName[]> {
        const cachedAssetName = this.getAssetNameFromCache(
            this.getCacheKey(asset)
        )

        if (!cachedAssetName) {
            const assetName = await this.getAssetNameFromApi(asset);
            this.setAssetNameInCache(this.getCacheKey(asset), assetName);
            return assetName;
        }

        return cachedAssetName;
    }

    public async getAssetNameFromApi(
        asset: string
    ): Promise<AssetName[]> {
        try {
            const response = await this.request.get<YahooFinanceAssetQuoteResponse>(
                `${yahooFinanceResourceConfig.get(
                    'apiUrl'
                    )}quote?region=${
                        this.yahooFinanceAPIRegion
                    }&lang=${
                        this.yahooFinanceAPILang
                    }&symbols=${asset}`,
                    { 
                        headers: { 
                            'X-API-KEY': yahooFinanceResourceConfig.get('apiKey')
                        } 
                    } 
            );

            return this.normalizeResponse(response.data)

            } catch (err) {
                if (err instanceof Error && HTTPUtil.Request.isRequestError(err)) {
                const error = HTTPUtil.Request.extractErrorData(err);
                throw new YahooFinanceResponseError(
                    `Error: ${JSON.stringify(error.data)} Code: ${error.status}` 
                )
            }
            throw new ClientRequestError(JSON.stringify(err));
        }  
    }

    protected getAssetNameFromCache(
        key: string
    ): AssetName[] | undefined {
        const assetNameFromCache = this.cacheUtil.get<AssetName[]>(key);

        if (!assetNameFromCache) {
            return;
        }

        logger.info(`Using cache to return asset name for key: ${key}`);
        return assetNameFromCache;
    }

    private getCacheKey(asset: string): string {
        return `${asset}`
    }

    private setAssetNameInCache(
        key: string,
        assetName: AssetName[]
    ): boolean {
        logger.info(`Updating cache to return asset name for key: ${key}`)
        return this.cacheUtil.set(
            key,
            assetName,
            yahooFinanceResourceConfig.get('cacheTtl')
        )
    }

    private normalizeResponse(
        names: YahooFinanceAssetQuoteResponse
        ): AssetName[] {
            return names.quoteResponse.result.filter(this.isValidName.bind(this)).map((name) => ({
                symbol: name.symbol,
                regularMarketPrice: name.regularMarketPrice,
                currency: name.currency,
                typeDisp: name.typeDisp,
                market: name.market,
                shortName: name.shortName
            }))
        }
        
   private isValidName(name: Partial<YahooFinanceResult>): boolean {
    return !!(
        name.symbol &&
        name.regularMarketPrice &&
        name.currency &&
        name.typeDisp &&
        name.market &&
        name.shortName
    )
   } 
}