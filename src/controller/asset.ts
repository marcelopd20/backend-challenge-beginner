import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('asset')
export class AssetController {

    @Get('')
    public getAssetForLoggedUser(_: Request , res: Response): void {
        res.send({
            "quoteResponse": {
                "result": [
                    {
                        "language": "en-US",
                        "region": "US",
                        "quoteType": "EQUITY",
                        "typeDisp": "Equity",
                        "quoteSourceName": "Nasdaq Real Time Price",
                        "triggerable": true,
                        "customPriceAlertConfidence": "HIGH",
                        "currency": "USD",
                        "exchange": "NMS",
                        "shortName": "Apple Inc.",
                        "longName": "Apple Inc.",
                        "messageBoardId": "finmb_24937",
                        "exchangeTimezoneName": "America/New_York",
                        "exchangeTimezoneShortName": "EST",
                        "gmtOffSetMilliseconds": -18000000,
                        "market": "us_market",
                        "esgPopulated": false,
                        "regularMarketChangePercent": -2.3772619,
                        "regularMarketPrice": 132.23,
                        "marketState": "POSTPOST",
                        "financialCurrency": "USD",
                        "regularMarketOpen": 134.352,
                        "firstTradeDateMilliseconds": 345479400000,
                        "priceHint": 2,
                        "postMarketChangePercent": -0.695756,
                        "postMarketTime": 1671757199,
                        "postMarketPrice": 131.31,
                        "postMarketChange": -0.919998,
                        "regularMarketChange": -3.2200012,
                        "regularMarketTime": 1671742804,
                        "regularMarketDayHigh": 134.55,
                        "regularMarketDayRange": "130.3 - 134.55",
                        "regularMarketDayLow": 130.3,
                        "regularMarketVolume": 77525684,
                        "regularMarketPreviousClose": 135.45,
                        "bid": 132.12,
                        "ask": 131.57,
                        "bidSize": 9,
                        "askSize": 10,
                        "fullExchangeName": "NasdaqGS",
                        "averageDailyVolume3Month": 87191733,
                        "averageDailyVolume10Day": 88673490,
                        "fiftyTwoWeekLowChange": 3.1900024,
                        "fiftyTwoWeekLowChangePercent": 0.024721038,
                        "fiftyTwoWeekRange": "129.04 - 182.94",
                        "fiftyTwoWeekHighChange": -50.710007,
                        "fiftyTwoWeekHighChangePercent": -0.27719474,
                        "fiftyTwoWeekLow": 129.04,
                        "fiftyTwoWeekHigh": 182.94,
                        "dividendDate": 1668038400,
                        "earningsTimestamp": 1666904400,
                        "earningsTimestampStart": 1674644340,
                        "earningsTimestampEnd": 1675080000,
                        "trailingAnnualDividendRate": 0.9,
                        "trailingPE": 21.64157,
                        "trailingAnnualDividendYield": 0.006644518,
                        "epsTrailingTwelveMonths": 6.11,
                        "epsForward": 6.77,
                        "epsCurrentYear": 6.21,
                        "priceEpsCurrentYear": 21.293076,
                        "sharesOutstanding": 15908100096,
                        "bookValue": 3.178,
                        "fiftyDayAverage": 144.4766,
                        "fiftyDayAverageChange": -12.246597,
                        "fiftyDayAverageChangePercent": -0.08476527,
                        "twoHundredDayAverage": 152.42,
                        "twoHundredDayAverageChange": -20.190002,
                        "twoHundredDayAverageChangePercent": -0.13246295,
                        "marketCap": 2103527997440,
                        "forwardPE": 19.531757,
                        "priceToBook": 41.60793,
                        "sourceInterval": 15,
                        "exchangeDataDelayedBy": 0,
                        "averageAnalystRating": "1.9 - Buy",
                        "tradeable": false,
                        "cryptoTradeable": false,
                        "displayName": "Apple",
                        "symbol": "AAPL"
                    }
                ],
                "error": null
            }
        })
    }
}