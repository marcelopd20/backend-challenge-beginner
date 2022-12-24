import { YahooFinance } from "@src/clients/yahooFinance";
import { InternalError } from "@src/util/errors/internal-error";

export interface AssetName{
    symbol: string;
    regularMarketPrice: number;                
    currency: string;
    typeDisp: string;
    market: string;
    shortName: string;
}

export class AssetProcessingInternalError extends InternalError {
    constructor(message: string) {
        super(`Unexpected error during the  processing: ${message}`);
    }
}

export class YahooFinanceAsset {
    constructor(protected yahooFinance = new YahooFinance()) {}

    public async processYahooFinanceForAsset(
        assets: AssetName[]
    ): Promise<void> {
        try {
            const asset = await this.yahooFinance.fetchName('AAPL,BTC-USD,EURUSD=X')

            console.log(asset);
        } catch (error) {
            throw new AssetProcessingInternalError((error as Error).message)
        }
    }

};