"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageRoutes = void 0;
const express_1 = require("express");
const infrastructure_1 = require("../../infrastructure");
const controller_1 = require("./controller");
class ImageRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const dataSource = new infrastructure_1.ImageDatasourceImpl();
        const controller = new controller_1.ImageController(dataSource);
        router.get('/:type/:img', controller.getImage);
        return router;
    }
}
exports.ImageRoutes = ImageRoutes;
