"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateEmailAuth = void 0;
class ValidateEmailAuth {
    constructor(repository) {
        this.repository = repository;
    }
    execute(token) {
        return this.repository.validateEmail(token);
    }
}
exports.ValidateEmailAuth = ValidateEmailAuth;
