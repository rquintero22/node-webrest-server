"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategory = void 0;
class UpdateCategory {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.update(dto);
    }
}
exports.UpdateCategory = UpdateCategory;
