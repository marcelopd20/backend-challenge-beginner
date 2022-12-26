import YahooAssetDto from './yahoo-asset-dto'
// cria type de asset da coluna id mais dados do YahooAssetDto(symbol, currency, price...)
type AssetResponseDto = { idAsset: string } & YahooAssetDto

export default AssetResponseDto
