
export class ProductEntity {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string, 
        public readonly category: number,
        public readonly user: number,
    ) {}

    public static fromJson(object: {[key: string]: any}): ProductEntity {
        const {id, name, available, price, description, user, category} = object;
        if(!id) throw 'Id is required';

        if(!name) throw 'name is required';

        const userId = 1;

        return new ProductEntity(id, name, available, price, description, category, user);
    }
}