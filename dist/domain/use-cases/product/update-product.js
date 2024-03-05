"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProduct = void 0;
class UpdateProduct {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.update(dto);
    }
}
exports.UpdateProduct = UpdateProduct;
