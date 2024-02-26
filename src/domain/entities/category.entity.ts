

export class CategoryEntity {
    constructor(
        public id: string,
        public name: string,
        public available: boolean,
        public userId: number,
    ) {}

    public static fromJson(object: {[key: string]: any}): CategoryEntity {
        const {id, name, available} = object;
        if(!id) throw 'Id is required';

        if(!name) throw 'name is required';

        const userId = 1;

        return new CategoryEntity(id, name, available, userId);
    }
}