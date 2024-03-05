"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryEntity = void 0;
class CategoryEntity {
    constructor(id, name, available, userId) {
        this.id = id;
        this.name = name;
        this.available = available;
        this.userId = userId;
    }
    static fromJson(object) {
        const { id, name, available } = object;
        if (!id)
            throw 'Id is required';
        if (!name)
            throw 'name is required';
        const userId = 1;
        return new CategoryEntity(id, name, available, userId);
    }
}
exports.CategoryEntity = CategoryEntity;
