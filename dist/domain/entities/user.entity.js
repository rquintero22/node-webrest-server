"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const custom_error_1 = require("../errors/custom.error");
class UserEntity {
    constructor(id, name, email, emailValidated, password, role, img) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.emailValidated = emailValidated;
        this.password = password;
        this.role = role;
        this.img = img;
    }
    static fromJson(object) {
        const { id, name, email, emailValidated, password, role, img } = object;
        if (!id) {
            throw custom_error_1.CustomError.badRequest('Missing id');
        }
        if (!name) {
            throw custom_error_1.CustomError.badRequest('Missing name');
        }
        if (!email) {
            throw custom_error_1.CustomError.badRequest('Missing email');
        }
        if (emailValidated === undefined) {
            throw custom_error_1.CustomError.badRequest('Missing email validated');
        }
        if (!password) {
            throw custom_error_1.CustomError.badRequest('Missing password');
        }
        if (!role) {
            throw custom_error_1.CustomError.badRequest('Missing role');
        }
        return new UserEntity(id, name, email, emailValidated, password, role, img);
    }
}
exports.UserEntity = UserEntity;
