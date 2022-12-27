import dotenv from 'dotenv'

dotenv.config()

export const Environments = {
  API_BASE_PATH: process.env.API_BASE_PATH ?? '/assets-watch-api/v1',
  SERVER_PORT: Number(process.env.SERVER_PORT ?? 3000),
  YAHOO_FINANCE_API_KEY: process.env.YAHOO_FINANCE_API_KEY,
  DB_CONNECTION_STRING: String(process.env.DB_CONNECTION_STRING),
  DB_ASSET_NAME: process.env.DB_ASSET_NAME ?? 'assets'
}
