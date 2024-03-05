"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCategories = void 0;
class GetCategories {
    constructor(repository) {
        this.repository = repository;
    }
    execute(paginationDto) {
        return this.repository.getAll(paginationDto);
    }
}
exports.GetCategories = GetCategories;
