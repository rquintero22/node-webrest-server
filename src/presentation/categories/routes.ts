import { Router } from "express";
import { CategoriesController } from './controller';
import { CategoryDatasourceImpl, CategoryRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class CategoryRoutes {
    static get routes() : Router {
        const router = Router();
        const dataSource = new CategoryDatasourceImpl();
        const categoryRepository = new CategoryRepositoryImpl(dataSource);

        const categoryController = new CategoriesController(categoryRepository);

        router.get('/', categoryController.getCategories);
        router.get('/:id', categoryController.getCategoryById);
        router.post('/', [ AuthMiddleware.validateJWT ], categoryController.createCategory);
        router.put('/:id', [ AuthMiddleware.validateJWT ], categoryController.updateCategory);
        router.delete('/:id', categoryController.deleteCategory);

        return router;
    }
}