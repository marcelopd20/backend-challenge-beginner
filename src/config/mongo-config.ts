import { MongoClient } from 'mongodb'
import { Environments } from './environment'

export const mongoClient: MongoClient = new MongoClient(Environments.DB_CONNECTION_STRING)
