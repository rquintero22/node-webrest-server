"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepositoryImpl = void 0;
class ProductRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    create(createProductDTO) {
        return this.datasource.create(createProductDTO);
    }
    getAll(paginationDto) {
        return this.datasource.getAll(paginationDto);
    }
    findById(id) {
        return this.datasource.findById(id);
    }
    update(updateProductDTO) {
        return this.datasource.update(updateProductDTO);
    }
    delete(id) {
        return this.datasource.delete(id);
    }
}
exports.ProductRepositoryImpl = ProductRepositoryImpl;
