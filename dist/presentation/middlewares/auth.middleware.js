"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const config_1 = require("../../config");
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
class AuthMiddleware {
    static validateJWT(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization = req.header('Authorization');
            if (!authorization)
                return res.status(401).json({ error: 'No token provided' });
            if (!authorization.startsWith('Bearer '))
                return res.status(401).json({ error: 'Invalid Bearer token' });
            const token = authorization.split(' ').at(1) || '';
            try {
                const payload = yield config_1.JwtAdapter.validateToken(token);
                if (!payload)
                    return res.status(401).json({ error: 'Invalid token' });
                const user = yield postgres_1.prisma.user.findFirst({ where: { id: +payload.id } });
                if (!user)
                    return res.status(401).json({ error: 'Invalid token' });
                if (!user.emailValidated)
                    return res.status(401).json({ error: 'Invalid user' });
                req.body.user = domain_1.UserEntity.fromJson(user);
                next();
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
