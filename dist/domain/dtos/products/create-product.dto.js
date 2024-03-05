"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductDto = void 0;
class CreateProductDto {
    constructor(name, available, price, description, userId, categoryId) {
        this.name = name;
        this.available = available;
        this.price = price;
        this.description = description;
        this.userId = userId;
        this.categoryId = categoryId;
    }
    static create(props) {
        const { name, available = false, price = 0, description, userId, categoryId } = props;
        let availableBoolean = available;
        if (!name || name.length === 0)
            return ['Missing name'];
        if (!userId)
            return ['Missing user'];
        if (!categoryId)
            return ['Missing category'];
        if (typeof available !== 'boolean') {
            availableBoolean = (available === 'true');
        }
        return [undefined, new CreateProductDto(name, availableBoolean, price, description, userId, categoryId)];
    }
}
exports.CreateProductDto = CreateProductDto;
