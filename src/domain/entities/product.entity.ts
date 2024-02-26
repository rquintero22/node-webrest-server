
export class ProductEntity {
    constructor(
        public id: string,
        public name: string,
        public available: boolean,
        public userId: number,
    ) {}

}