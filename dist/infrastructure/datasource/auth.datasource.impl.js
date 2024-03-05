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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthDatasourceImpl = void 0;
const config_1 = require("../../config");
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
const user_entity_1 = require("../../domain/entities/user.entity");
class AuthDatasourceImpl {
    constructor(mailRepository) {
        this.mailRepository = mailRepository;
        this.sendEmailValidationLink = (email) => __awaiter(this, void 0, void 0, function* () {
            const token = yield config_1.JwtAdapter.generateToken({ email });
            if (!token)
                throw domain_1.CustomError.internalServer(`Error getting token`);
            const link = `${config_1.envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
            const html = `
        <h1>Validate your email</h1>
        <p>Click on the following link to validate your email</p>
        <a href="${link}">Validate your email: ${email}</a>
        `;
            const options = {
                to: email,
                subject: 'Validate your email',
                htmlBody: html
            };
            const isSet = yield this.mailRepository.send(options);
            if (!isSet)
                throw domain_1.CustomError.internalServer('Error sending email');
            return true;
        });
    }
    login(loginUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDB = yield postgres_1.prisma.user.findFirst({ where: { email: loginUserDto.email } });
            if (!userDB)
                throw domain_1.CustomError.badRequest(`Email / password ${loginUserDto.email} not exist`);
            const validPassword = config_1.bcryptAdapter.compare(loginUserDto.password, userDB.password);
            if (!validPassword)
                throw domain_1.CustomError.badRequest(`Email / password ${loginUserDto.email} not exist`);
            const _a = user_entity_1.UserEntity.fromJson(userDB), { password } = _a, rest = __rest(_a, ["password"]);
            const token = yield this.generateToken(Object.assign(Object.assign({}, rest), { password }));
            return { user: rest, token };
        });
    }
    register(registerUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const existUser = yield postgres_1.prisma.user.findFirst({ where: { email: registerUserDto.email } });
            if (existUser)
                throw domain_1.CustomError.badRequest(`Email ${registerUserDto.email} already exist`);
            registerUserDto.password = config_1.bcryptAdapter.hash(registerUserDto.password);
            const user = yield postgres_1.prisma.user.create({
                data: registerUserDto
            });
            yield this.sendEmailValidationLink(user.email);
            const _a = user_entity_1.UserEntity.fromJson(user), { password } = _a, rest = __rest(_a, ["password"]);
            const token = yield this.generateToken(Object.assign(Object.assign({}, rest), { password }));
            return { user: rest, token };
        });
    }
    validateEmail(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = yield config_1.JwtAdapter.validateToken(token);
            if (!payload)
                throw domain_1.CustomError.unauthorized('Invalid token');
            const { email } = payload;
            if (!email)
                throw domain_1.CustomError.internalServer('Email not in token');
            const user = yield postgres_1.prisma.user.findFirst({ where: { email } });
            if (!user)
                throw domain_1.CustomError.internalServer('Email not exists');
            user.emailValidated = true;
            yield postgres_1.prisma.user.update({
                where: { id: user.id },
                data: { emailValidated: true }
            });
            return true;
        });
    }
    generateToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield config_1.JwtAdapter.generateToken({ id: user.id });
            if (!token)
                throw domain_1.CustomError.internalServer('Error while creating Jwt');
            return token;
        });
    }
}
exports.AuthDatasourceImpl = AuthDatasourceImpl;
