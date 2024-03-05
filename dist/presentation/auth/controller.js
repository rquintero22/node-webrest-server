"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const domain_1 = require("../../domain");
class AuthController {
    constructor(authRepository) {
        this.authRepository = authRepository;
        this.handleError = (res, error) => {
            if (error instanceof domain_1.CustomError) {
                res.status(error.statusCode).json({ error: error.message });
                return;
            }
            res.status(500).json({ error: 'Internal server error - check logs' });
        };
        this.login = (req, res) => {
            const [error, loginDto] = domain_1.LoginUserDto.create(req.body);
            if (error)
                return this.handleError(res, error);
            new domain_1.LoginUser(this.authRepository)
                .execute(loginDto)
                .then(user => res.json(user))
                .catch(error => this.handleError(res, error));
        };
        this.register = (req, res) => {
            const [error, registerDto] = domain_1.RegisterUserDto.create(req.body);
            if (error)
                return this.handleError(res, error);
            new domain_1.RegisterUser(this.authRepository)
                .execute(registerDto)
                .then(user => res.status(201).json(user))
                .catch(error => this.handleError(res, error));
        };
        this.validateEmail = (req, res) => {
            const { token } = req.params;
            new domain_1.ValidateEmailAuth(this.authRepository)
                .execute(token)
                .then(() => res.json('Email validated'))
                .catch(error => this.handleError(res, error));
        };
    }
}
exports.AuthController = AuthController;
