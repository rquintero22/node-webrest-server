"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = void 0;
class LoginUser {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.login(dto);
    }
}
exports.LoginUser = LoginUser;
