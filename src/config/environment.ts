import dotenv from 'dotenv'

dotenv.config()

export const Environments = {
  // monta caminho base
  API_BASE_PATH: process.env.API_BASE_PATH || '/assets-watch-api',
  // monta porta
  SERVER_PORT: Number(process.env.SERVER_PORT || 3000),
  // passa chave da api do yahoo
  YAHOO_FINANCE_API_KEY: process.env.YAHOO_FINANCE_API_KEY
}
