"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategory = void 0;
class DeleteCategory {
    constructor(repository) {
        this.repository = repository;
    }
    execute(id) {
        return this.repository.delete(id);
    }
}
exports.DeleteCategory = DeleteCategory;
