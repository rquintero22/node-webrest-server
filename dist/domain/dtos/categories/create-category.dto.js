"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryDto = void 0;
class CreateCategoryDto {
    constructor(name, available) {
        this.name = name;
        this.available = available;
    }
    static create(props) {
        const { name, available = false } = props;
        let availableBoolean = available;
        if (!name || name.length === 0)
            return ['Missing name'];
        if (typeof available !== 'boolean') {
            availableBoolean = (available === 'true');
        }
        return [undefined, new CreateCategoryDto(name, availableBoolean)];
    }
}
exports.CreateCategoryDto = CreateCategoryDto;
