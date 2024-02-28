import { Router } from "express";
import { ImageDatasourceImpl } from "../../infrastructure";
import { ImageController } from "./controller";

export class ImageRoutes {
    static get routes(): Router {
        const router = Router();
        const dataSource = new ImageDatasourceImpl();
        const controller = new ImageController(dataSource);

        router.get('/:type/:img', controller.getImage);

        return router;
    }
}