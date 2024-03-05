"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductEntity = void 0;
class ProductEntity {
    constructor(id, name, available, price, description, category, user) {
        this.id = id;
        this.name = name;
        this.available = available;
        this.price = price;
        this.description = description;
        this.category = category;
        this.user = user;
    }
    static fromJson(object) {
        const { id, name, available, price, description, user, category } = object;
        if (!id)
            throw 'Id is required';
        if (!name)
            throw 'name is required';
        const userId = 1;
        return new ProductEntity(id, name, available, price, description, category, user);
    }
}
exports.ProductEntity = ProductEntity;
