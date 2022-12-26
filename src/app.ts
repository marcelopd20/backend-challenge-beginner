import 'dotenv'
import express from 'express'
import { Environments } from './config/environment'
import { mongoClient } from './config/mongo-config'
import { errorMiddleware } from './middleware/error-middleware'
import { routes } from './routes/routes'

// encapsula expressa
const app = express()

app.use(express.json())
// passa caminho para rotas
app.use(Environments.API_BASE_PATH, routes)
// monsta var com número da porta
// midleware erro, trata exceções
app.use(errorMiddleware)
const port: number = Environments.SERVER_PORT
// liga servidor
app.listen(port, async () => {
  console.log(`[${Environments.API_BASE_PATH}] Server running on port ${port}`)
  // chama conexão com banco
  await mongoClient.connect()
  console.log('MongoDB connected')
})
// exporta app
export { app }
