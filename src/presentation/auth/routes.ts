import { Router } from "express";
import { AuthController } from "./controller";
import { AuthRepositoryImpl } from "../../infrastructure/repositories/auth.repository.impl";
import { envs } from "../../config";
import { AuthDatasourceImpl, MailDatasourceImpl, MailRepositoryImpl } from "../../infrastructure";

export class AuthRoutes {
    static get routes() : Router {
        const router = Router();
        const mailDataSource = new MailDatasourceImpl(envs.MAILER_SERVICE, envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY);
        const mailRepository = new MailRepositoryImpl(mailDataSource);
        const dataSource = new AuthDatasourceImpl(mailRepository);
        const authRepository = new AuthRepositoryImpl(dataSource);

        const authController = new AuthController(authRepository);

        router.post('/login', authController.login);
        router.post('/register', authController.register);
        router.get('/validate-email/:token', authController.validateEmail);

        return router;
    }
}