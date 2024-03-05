"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const infrastructure_1 = require("../../infrastructure");
const file_upload_middlewate_1 = require("../middlewares/file-upload.middlewate");
const type_middleware_1 = require("../middlewares/type.middleware");
class FileUploadRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const dataSource = new infrastructure_1.FileUploadDatasourceImpl();
        const controller = new controller_1.FileUploadController(dataSource);
        router.use([file_upload_middlewate_1.FileUploadMiddleware.containtFiles, type_middleware_1.TypeMiddleware.validTypes(['users', 'products', 'categories'])]);
        router.post('/single/:type', controller.uploadFile);
        router.post('/multiple/:type', controller.uploadMultipleFiles);
        return router;
    }
}
exports.FileUploadRoutes = FileUploadRoutes;
