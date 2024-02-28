import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadDatasourceImpl } from "../../infrastructure";
import { FileUploadMiddleware } from "../middlewares/file-upload.middlewate";
import { TypeMiddleware } from "../middlewares/type.middleware";

export class FileUploadRoutes {
    static get routes(): Router {
        const router = Router();
        const dataSource = new FileUploadDatasourceImpl();
        const controller = new FileUploadController(dataSource);

        router.use([FileUploadMiddleware.containtFiles, TypeMiddleware.validTypes(['users', 'products', 'categories'])]);

        router.post('/single/:type', controller.uploadFile);
        router.post('/multiple/:type', controller.uploadMultipleFiles);

        return router;
    }
}