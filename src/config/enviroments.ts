import dotenv from 'dotenv';

dotenv.config()

export const Enviroments = {
    API_BASE_PATH: process.env.API_BASE_PATH || '/assets-watch-api',
    SERVER_PORT: Number(process.env.SERVER_PORT || 3000),
}