
import { Request, Response } from 'express';
import { CreateCategoryDto, CreateProductDto, PaginationDto, UpdateCategoryDto, UpdateProductDto } from '../../domain/dtos';
import { CustomError, ProductRepository, DeleteCategory, GetProducts, DeleteProduct, UpdateProduct, CreateProduct, GetProduct } from '../../domain';

export class ProductsController {

    constructor(
        private readonly productRepository: ProductRepository
    ) {}

    private handleError = (res: Response, error: unknown) => {
        if(error instanceof CustomError) {
            res.status(error.statusCode).json({error: error.message});
            return;
        } 
        console.log(error);
        res.status(500).json({error: 'Internal server error - check logs'});
    }

    public getProducts = (req: Request, res: Response) => {
        const {page = 1, limit = 10} = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);

        if(error) return res.status(400).json({error});

        new GetProducts(this.productRepository)
            .execute(paginationDto!)
            .then(product => res.json(product))
            .catch(error => this.handleError(res, error));
    }

    public getProductById = (req: Request, res: Response) => {
        const id = +req.params.id;

        new GetProduct(this.productRepository)
            .execute(id)
            .then(product => res.json(product))
            .catch(error => this.handleError(res, error));
    }

    public createProduct = (req: Request, res: Response) => {
        const [error, createProductDto] = CreateProductDto.create( {
            ...req.body,
            userId: req.body.user.id
        });

        if (error) return res.status(400).json({error});

        new CreateProduct(this.productRepository)
        .execute(createProductDto!)
        .then(product => res.status(201).json(product))
       .catch(error => this.handleError(res, error));
    }

    public updateProduct = (req: Request, res: Response) => {

        const id = +req.params.id;

        const [error, updateProductDto] = UpdateProductDto.create({...req.body, id});
        
        if (error) return res.status(400).json({error});

        new UpdateProduct(this.productRepository)
        .execute(updateProductDto!)
        .then(product => res.json(product))
       .catch(error => this.handleError(res, error)); 

    }

    public deleteProduct = (req: Request, res: Response) => {
        const id = +req.params.id;

        new DeleteProduct(this.productRepository)
            .execute(id)
            .then(category => res.json(category))
           .catch(error => this.handleError(res, error));

    }

}