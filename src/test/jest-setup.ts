import dotenv from 'dotenv'
import path from 'path'

//configura ambiente de teste
process.env.NODE_ENV = 'test'
dotenv.config({
    path: path.resolve(process.cwd(), '.env.test'),
    override: true
})