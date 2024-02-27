import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ProductDatasourceImpl } from "../../infrastructure";
import { ProductRepositoryImpl } from "../../infrastructure/repositories/product.repository.impl";
import { ProductsController } from "./controller";

export class ProductRoutes {
    static get routes() : Router {
        const router = Router();
        const dataSource = new ProductDatasourceImpl();
        const productRepository = new ProductRepositoryImpl(dataSource);

        const productController = new ProductsController(productRepository);

        router.get('/', productController.getProducts);
        router.get('/:id', productController.getProductById);
        router.post('/', [ AuthMiddleware.validateJWT ], productController.createProduct);
        router.put('/:id', [ AuthMiddleware.validateJWT ], productController.updateProduct);
        router.delete('/:id', productController.deleteProduct);

        return router;
    }
}