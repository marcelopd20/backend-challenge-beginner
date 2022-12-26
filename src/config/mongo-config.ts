import { MongoClient } from 'mongodb'
import { Environments } from './environment'

// estabelece conexão com banco
export const mongoClient: MongoClient = new MongoClient(Environments.DB_CONNECTION_STRING)
