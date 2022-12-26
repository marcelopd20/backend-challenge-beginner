import { Router } from "express";
import { assetRoutes } from "./asset-routes";
// cria rota /assets na api
export const routes = Router()
routes.use('/assets', assetRoutes)