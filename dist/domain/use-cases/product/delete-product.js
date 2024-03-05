"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProduct = void 0;
class DeleteProduct {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.delete(id);
    }
}
exports.DeleteProduct = DeleteProduct;
