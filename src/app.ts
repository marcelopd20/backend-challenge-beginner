import 'dotenv'
import express from 'express'
import { Environments } from './config/environment'
import { mongoClient } from './config/mongo-config'
import { errorMiddleware } from './middleware/error-middleware'
import { routes } from './routes/routes'


const app = express()

app.use(express.json())
app.use(Environments.API_BASE_PATH, routes)
app.use(errorMiddleware)
const port: number = Environments.SERVER_PORT
app.listen(port, async () => {
  console.log(`[${Environments.API_BASE_PATH}] Server running on port ${port}`)
  await mongoClient.connect()
  console.log('MongoDB connected')
})
export { app }
