import { YahooFinance } from '@src/clients/yahooFinance';
import * as HTTPUtil from '@src/util/request';
import YahooFinanceAssetFixture from '@test/fixtures/yahoofinance_asset.json';
import YahooFinanceAssetNormalizedFixture from '@test/fixtures/yahoofinancenormalized_asset.json';

jest.mock('@src/util/request');

describe('YahooFinance client', () => {
    const MockedRequestClass = HTTPUtil.Request as jest.Mocked<typeof HTTPUtil.Request>;

    const mockedRequest = new HTTPUtil.Request() as jest.Mocked<HTTPUtil.Request>
    it('should return the normalized asset from the YahooFinance service', async () => {
        const asset = 'APPL';

        mockedRequest.get.mockResolvedValue({ data : YahooFinanceAssetFixture } as HTTPUtil.Response)        

        const yahooFinance = new YahooFinance(mockedRequest);
        const response = await yahooFinance.fetchName(asset);
        expect({ "quoteResponse": {"error": null, "result": response }}).toEqual(YahooFinanceAssetNormalizedFixture);
    });

    it('should exclude incomplete data', async () => {
        const asset = 'I';
        const errorResponse = {
            "quoteResponse": {
                "result": [],
                "error": null
            }
        }
        
        MockedRequestClass.isRequestError.mockReturnValue(true);

        mockedRequest.get.mockResolvedValue({ data : errorResponse } as HTTPUtil.Response)        

        const yahooFinance = new YahooFinance(mockedRequest);
        const response = await yahooFinance.fetchName(asset);
        expect(response).toEqual([])
        
    });

    it('should get a generic error from Yahoo Finance serive when the request fail before reaching the service', async () => {
        const asset = 'APPL';

        mockedRequest.get.mockRejectedValue({ message: 'Network Error' });

        const yahooFinance = new YahooFinance(mockedRequest);

        await expect(yahooFinance.fetchName(asset)).rejects.toThrow(
            'Unexpected error when trying to communicate to YahooFinance: Network Error'
        )

    })

})