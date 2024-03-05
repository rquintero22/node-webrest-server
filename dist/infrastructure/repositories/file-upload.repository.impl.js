"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadRepositoryImpl = void 0;
class FileUploadRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    uploadSingle(file, folder, validExtensions) {
        return this.datasource.uploadSingle(file, folder, validExtensions);
    }
    uploadMultiple(file, folder, validExtensions) {
        return this.datasource.uploadMultiple(file, folder, validExtensions);
    }
}
exports.FileUploadRepositoryImpl = FileUploadRepositoryImpl;
