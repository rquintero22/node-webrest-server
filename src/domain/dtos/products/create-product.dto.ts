export class CreateProductDto {
    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly userId: number,
        public readonly categoryId: number,
    ) {}

    static create(props: {[key:string]: any}): [string?, CreateProductDto?] {

        const {name, available = false, price=0, description, userId, categoryId} = props;
        let availableBoolean = available;

        if(!name || name.length === 0) return ['Missing name'];
        if(!userId ) return ['Missing user'];
        if(!categoryId ) return ['Missing category'];

        if (typeof available !== 'boolean') {
            availableBoolean = (available === 'true');
        }

        return [undefined, new CreateProductDto(name, availableBoolean, price, description, userId, categoryId)];
    }
}