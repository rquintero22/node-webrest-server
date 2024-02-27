import { ProductEntity, ProductRepository, CreateProductDto, PaginationDto, UpdateProductDto, UserEntity } from "../../domain";
import { ProductDatasource } from "../../domain/datasources";

export class ProductRepositoryImpl implements ProductRepository {

    constructor(
        private readonly datasource: ProductDatasource
    ){}

    create(createProductDTO: CreateProductDto): Promise<ProductEntity> {
        return this.datasource.create(createProductDTO);
    }
    getAll(paginationDto: PaginationDto): Promise<ProductEntity[]> {
        return this.datasource.getAll(paginationDto);
    }
    findById(id: number): Promise<ProductEntity> {
        return this.datasource.findById(id);
    }
    update(updateProductDTO: UpdateProductDto): Promise<ProductEntity> {
        return this.datasource.update(updateProductDTO);
    }
    delete(id: number): Promise<ProductEntity> {
       return this.datasource.delete(id);
    }

}