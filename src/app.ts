import 'dotenv';
import express from 'express';
import { Enviroments } from './config/enviroments';


// encapsula expressa
const app = express()

app.use(express.json())

const port: number = Enviroments.SERVER_PORT
// liga servidor
app.listen(port, async () => {
    console.log(`[${Enviroments.API_BASE_PATH}] Server running on port ${port}`)
})

export { app }