describe('Asset price function tests', () => {
    it('should return a price with a just few times', async () => {
        const { body, status } = await global.testRequest.get('/asset');
        expect(status).toBe(200);
        expect(body).toEqual([
            {
                "symbol": "AAPL",
                "typeDisp": "Ação",
                "regularMarketPrice": 131.86,
                "currency": "USD",
                "market": "us_market",
                "shortName": "Apple Inc."
            },
            {
                "symbol": "BTC-USD",
                "typeDisp": "Cryptocurrency",
                "regularMarketPrice": 16838.783,
                "currency": "USD",
                "market": "ccc_market",
                "shortName": "Bitcoin USD"
            },
            {
                "symbol": "EURUSD=X",
                "typeDisp": "Currency",
                "regularMarketPrice": 1.0630381,
                "currency": "USD",
                "market": "ccy_market",
                "shortName": "EUR/USD"
            }
        ]);
    });
});
