import { Controller, Get } from '@overnightjs/core';
import { YahooFinance } from '@src/clients/yahooFinance';
import { Request, Response } from 'express';
import { Asset } from '@src/model/asset';
import { YahooFinanceAsset } from '@src/service/asset';

const yahooFinance = new YahooFinance();

@Controller('asset')
export class AssetController {
    @Get('')
    public async getAssetForLoggedUser(_: Request, res: Response): Promise<void> {
        const assets = await new YahooFinanceAsset();
        res.status(200).send(assets)

    };
}
