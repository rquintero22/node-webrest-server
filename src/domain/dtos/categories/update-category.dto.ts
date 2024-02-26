export class UpdateCategoryDto {
    private constructor(
        public readonly id: number,
        public readonly name?: string,
        public readonly available?: boolean
    ) {}

    get values() {
        const returnObj: {[key: string]: any} = {};

        if(this.name) returnObj.name = this.name;
        if(this.available) returnObj.available = this.available;

        return returnObj;
    }

    static create(props: {[key:string]: any}): [string?, UpdateCategoryDto?] {

        const {id, name, avalaible} = props;

        if (!id || isNaN(Number(id))) {
            return ['id must be a valid number'];
        }

        return [undefined, new UpdateCategoryDto(id, name, avalaible)];
    }
}