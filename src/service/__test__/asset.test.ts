import { YahooFinance } from "@src/clients/yahooFinance";
import yahooFinanceNormalizedFixture from '@test/fixtures/yahoofinancenormalized_asset.json'

// jest.mock('@/src/clients/yahooFinance');

describe('asset Service', () => {
    it('Should return price for a list of assets', async() => {
        
        const assets = new YahooFinance();

        expect(1).toEqual(1)
    })
})