import { Router } from "express";
import { AuthController } from "./controller";
import { AuthRepositoryImpl } from "../../infrastructure/repositories/auth.repository.impl";
import { AuthDatasourceImpl } from "../../infrastructure/datasource/auth.datasource.impl";

export class AuthRoutes {
    static get routes() : Router {
        const router = Router();
        const dataSource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(dataSource);

        const authController = new AuthController(authRepository);

        router.post('/login', authController.login);
        router.post('/register', authController.register);
        router.get('/validate-email/:token', authController.validateEmail);

        return router;
    }
}