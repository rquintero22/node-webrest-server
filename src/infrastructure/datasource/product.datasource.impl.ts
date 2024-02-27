import { prisma } from "../../data/postgres";

import { CustomError, ProductEntity, CreateProductDto, UpdateProductDto, PaginationDto } from "../../domain";
import { ProductDatasource } from "../../domain/datasources";

export class ProductDatasourceImpl implements ProductDatasource {

    async create(createProductDTO: CreateProductDto): Promise<ProductEntity> {
        
        const product = await prisma.product.create({
            data: {...createProductDTO!}
        });
        return ProductEntity.fromJson(product);
    }
    async getAll(paginationDto: PaginationDto): Promise<any> {
        const {page, limit} = paginationDto;
        //const products = await prisma.product.findMany({ skip: (page -1) * limit, take: limit } );
        //const total = await prisma.product.count();

        const [total, products] = await Promise.all([
            prisma.product.count(),
            prisma.product.findMany({ skip: (page -1) * limit, take: limit, 
                                        include: { user: true, category: true } } )
        ]);

        return {
            total,
            page,
            limit,
            next: `/api/products?page=${page+1}&limit=${limit}`,
            prev: (page -1 > 0) ? `/api/products?page=${page-1}&limit=${limit}` : null,
            products: products.map(product => ProductEntity.fromJson(product))
        };
    }
    async findById(id: number): Promise<ProductEntity> {
        const product = await prisma.product.findFirst({ where: { id }});
        if (!product) {
            throw CustomError.notFound(`Product with id ${id} not found`);
        }
        return ProductEntity.fromJson(product);
    }
    async update(updateProductDTO: UpdateProductDto): Promise<ProductEntity> {
        const product = await this.findById(updateProductDTO.id);

        const updatedProduct = await prisma.product.update({
            where: { id: updateProductDTO.id },
            data: updateProductDTO!.values
        });

        return ProductEntity.fromJson(updatedProduct);
    }
    async delete(id: number): Promise<ProductEntity> {
        const product = await this.findById(id);

        const deleted = await prisma.product.delete({where: {id}});

        return ProductEntity.fromJson(deleted);
    }

}