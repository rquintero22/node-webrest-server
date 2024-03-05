"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadSingle = void 0;
class UploadSingle {
    constructor(repository) {
        this.repository = repository;
    }
    execute(file, folder, validExtensions) {
        return this.repository.uploadSingle(file, folder, validExtensions);
    }
}
exports.UploadSingle = UploadSingle;
