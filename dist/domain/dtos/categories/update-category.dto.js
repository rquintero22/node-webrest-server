"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoryDto = void 0;
class UpdateCategoryDto {
    constructor(id, name, available) {
        this.id = id;
        this.name = name;
        this.available = available;
    }
    get values() {
        const returnObj = {};
        if (this.name)
            returnObj.name = this.name;
        if (this.available)
            returnObj.available = this.available;
        return returnObj;
    }
    static create(props) {
        const { id, name, avalaible } = props;
        if (!id || isNaN(Number(id))) {
            return ['id must be a valid number'];
        }
        return [undefined, new UpdateCategoryDto(id, name, avalaible)];
    }
}
exports.UpdateCategoryDto = UpdateCategoryDto;
