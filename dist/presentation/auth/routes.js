"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_repository_impl_1 = require("../../infrastructure/repositories/auth.repository.impl");
const config_1 = require("../../config");
const infrastructure_1 = require("../../infrastructure");
class AuthRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const mailDataSource = new infrastructure_1.MailDatasourceImpl(config_1.envs.MAILER_SERVICE, config_1.envs.MAILER_EMAIL, config_1.envs.MAILER_SECRET_KEY, config_1.envs.SEND_EMAIL);
        const mailRepository = new infrastructure_1.MailRepositoryImpl(mailDataSource);
        const dataSource = new infrastructure_1.AuthDatasourceImpl(mailRepository);
        const authRepository = new auth_repository_impl_1.AuthRepositoryImpl(dataSource);
        const authController = new controller_1.AuthController(authRepository);
        router.post('/login', authController.login);
        router.post('/register', authController.register);
        router.get('/validate-email/:token', authController.validateEmail);
        return router;
    }
}
exports.AuthRoutes = AuthRoutes;
