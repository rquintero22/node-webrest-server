"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const infrastructure_1 = require("../../infrastructure");
const auth_middleware_1 = require("../middlewares/auth.middleware");
class CategoryRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const dataSource = new infrastructure_1.CategoryDatasourceImpl();
        const categoryRepository = new infrastructure_1.CategoryRepositoryImpl(dataSource);
        const categoryController = new controller_1.CategoriesController(categoryRepository);
        router.get('/', categoryController.getCategories);
        router.get('/:id', categoryController.getCategoryById);
        router.post('/', [auth_middleware_1.AuthMiddleware.validateJWT], categoryController.createCategory);
        router.put('/:id', [auth_middleware_1.AuthMiddleware.validateJWT], categoryController.updateCategory);
        router.delete('/:id', categoryController.deleteCategory);
        return router;
    }
}
exports.CategoryRoutes = CategoryRoutes;
