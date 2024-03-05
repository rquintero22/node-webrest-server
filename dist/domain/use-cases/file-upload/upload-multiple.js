"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadMultiple = void 0;
class UploadMultiple {
    constructor(repository) {
        this.repository = repository;
    }
    execute(file, folder, validExtensions) {
        return this.repository.uploadMultiple(file, folder, validExtensions);
    }
}
exports.UploadMultiple = UploadMultiple;
