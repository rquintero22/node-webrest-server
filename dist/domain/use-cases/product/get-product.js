"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProduct = void 0;
class GetProduct {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.findById(id);
    }
}
exports.GetProduct = GetProduct;
