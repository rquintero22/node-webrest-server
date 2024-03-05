"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUser = void 0;
class RegisterUser {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.register(dto);
    }
}
exports.RegisterUser = RegisterUser;
