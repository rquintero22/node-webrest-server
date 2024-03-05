"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const routes_1 = require("./todos/routes");
const routes_2 = require("./auth/routes");
const routes_3 = require("./categories/routes");
const routes_4 = require("./products/routes");
const routes_5 = require("./file-upload/routes");
const routes_6 = require("./images/routes");
const routes_7 = require("./tickets/routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use('/api/todos', routes_1.TodoRoutes.routes);
        router.use('/api/auth', routes_2.AuthRoutes.routes);
        router.use('/api/categories', routes_3.CategoryRoutes.routes);
        router.use('/api/products', routes_4.ProductRoutes.routes);
        router.use('/api/upload', routes_5.FileUploadRoutes.routes);
        router.use('/api/images', routes_6.ImageRoutes.routes);
        router.use('/api/ticket', routes_7.TicketRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
