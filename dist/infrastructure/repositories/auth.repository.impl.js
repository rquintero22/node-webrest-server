"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepositoryImpl = void 0;
class AuthRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    login(loginUserDto) {
        return this.datasource.login(loginUserDto);
    }
    register(registerUserDto) {
        return this.datasource.register(registerUserDto);
    }
    validateEmail(token) {
        return this.datasource.validateEmail(token);
    }
}
exports.AuthRepositoryImpl = AuthRepositoryImpl;
