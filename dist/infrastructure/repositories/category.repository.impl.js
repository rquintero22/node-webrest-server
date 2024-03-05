"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepositoryImpl = void 0;
class CategoryRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    create(createCategoryDTO, user) {
        return this.datasource.create(createCategoryDTO, user);
    }
    getAll(paginationDto) {
        return this.datasource.getAll(paginationDto);
    }
    findById(id) {
        return this.datasource.findById(id);
    }
    update(updateCategoryDTO) {
        return this.datasource.update(updateCategoryDTO);
    }
    delete(id) {
        return this.datasource.delete(id);
    }
}
exports.CategoryRepositoryImpl = CategoryRepositoryImpl;
