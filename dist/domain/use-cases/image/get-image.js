"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetImage = void 0;
class GetImage {
    constructor(repository) {
        this.repository = repository;
    }
    execute(type, image) {
        return this.repository.getImage(type, image);
    }
}
exports.GetImage = GetImage;
