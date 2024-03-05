"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategory = void 0;
class CreateCategory {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto, user) {
        return this.repository.create(dto, user);
    }
}
exports.CreateCategory = CreateCategory;
