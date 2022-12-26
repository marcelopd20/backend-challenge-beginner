import 'dotenv'
import express from 'express'
import { Environments } from './config/environment'

// encapsula expressa
const app = express()

app.use(express.json())

const port: number = Environments.SERVER_PORT
// liga servidor
app.listen(port, async () => {
  console.log(`[${Environments.API_BASE_PATH}] Server running on port ${port}`)
})

export { app }
