"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const infrastructure_1 = require("../../infrastructure");
const product_repository_impl_1 = require("../../infrastructure/repositories/product.repository.impl");
const controller_1 = require("./controller");
class ProductRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const dataSource = new infrastructure_1.ProductDatasourceImpl();
        const productRepository = new product_repository_impl_1.ProductRepositoryImpl(dataSource);
        const productController = new controller_1.ProductsController(productRepository);
        router.get('/', productController.getProducts);
        router.get('/:id', productController.getProductById);
        router.post('/', [auth_middleware_1.AuthMiddleware.validateJWT], productController.createProduct);
        router.put('/:id', [auth_middleware_1.AuthMiddleware.validateJWT], productController.updateProduct);
        router.delete('/:id', productController.deleteProduct);
        return router;
    }
}
exports.ProductRoutes = ProductRoutes;
