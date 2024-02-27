
import { ProductEntity } from "../../entities";
import { ProductRepository } from "../../repositories";

export interface GetProductUseCase {
    execute(id: Number): Promise<ProductEntity>;
}

export class GetProduct implements GetProductUseCase {

    constructor(
        private readonly repository: ProductRepository
    ){}

    execute(id: number): Promise<ProductEntity> {
        return this.repository.findById(id);
    }

}