import YahooFinanceApi from "~/api/yahoo-finance-api";
import AddAssetDto from "~/dtos/add-asset-dto";
import AssetResponseDto from "~/dtos/asset-response-dto";
import YahooAssetDto from "~/dtos/yahoo-asset-dto";
import Asset from "~/model/asset";
import AssetRepository from "~/repository/asset-repository";

//classe AddAssetUseCase
export default class AddAssetUseCase {
    public constructor(
        //atribui valor para conexão com banco
        private readonly assetRepository: AssetRepository,
        //atribui valor para conexão com yahooApi
        private readonly yahooFinanceApi: YahooFinanceApi
    ) {}

    //método para adicionar
    public async add(addAssetDto: AddAssetDto): Promise<AssetResponseDto> {
        //conecta no banco e realiza ação de adicionar gera id mais symbol, userId
        const result: Asset = await this.assetRepository.addAsset(addAssetDto)
        //conecta com api e busca dados referentes ao ativo buscado
        const yahooAsset: YahooAssetDto = await this.yahooFinanceApi.getAsset(result.symbol)
        //retorna obj com id da asset no bd e dados da asset
        return { idAsset: result._id, ...yahooAsset }
    }
}