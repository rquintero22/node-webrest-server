"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageRepositoryImpl = void 0;
class ImageRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    getImage(tpye, img) {
        return this.datasource.getImage(tpye, img);
    }
}
exports.ImageRepositoryImpl = ImageRepositoryImpl;
