"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const dtos_1 = require("../../domain/dtos");
const domain_1 = require("../../domain");
class ProductsController {
    constructor(productRepository) {
        this.productRepository = productRepository;
        this.handleError = (res, error) => {
            if (error instanceof domain_1.CustomError) {
                res.status(error.statusCode).json({ error: error.message });
                return;
            }
            console.log(error);
            res.status(500).json({ error: 'Internal server error - check logs' });
        };
        this.getProducts = (req, res) => {
            const { page = 1, limit = 10 } = req.query;
            const [error, paginationDto] = dtos_1.PaginationDto.create(+page, +limit);
            if (error)
                return res.status(400).json({ error });
            new domain_1.GetProducts(this.productRepository)
                .execute(paginationDto)
                .then(product => res.json(product))
                .catch(error => this.handleError(res, error));
        };
        this.getProductById = (req, res) => {
            const id = +req.params.id;
            new domain_1.GetProduct(this.productRepository)
                .execute(id)
                .then(product => res.json(product))
                .catch(error => this.handleError(res, error));
        };
        this.createProduct = (req, res) => {
            const [error, createProductDto] = dtos_1.CreateProductDto.create(Object.assign(Object.assign({}, req.body), { userId: req.body.user.id }));
            if (error)
                return res.status(400).json({ error });
            new domain_1.CreateProduct(this.productRepository)
                .execute(createProductDto)
                .then(product => res.status(201).json(product))
                .catch(error => this.handleError(res, error));
        };
        this.updateProduct = (req, res) => {
            const id = +req.params.id;
            const [error, updateProductDto] = dtos_1.UpdateProductDto.create(Object.assign(Object.assign({}, req.body), { id }));
            if (error)
                return res.status(400).json({ error });
            new domain_1.UpdateProduct(this.productRepository)
                .execute(updateProductDto)
                .then(product => res.json(product))
                .catch(error => this.handleError(res, error));
        };
        this.deleteProduct = (req, res) => {
            const id = +req.params.id;
            new domain_1.DeleteProduct(this.productRepository)
                .execute(id)
                .then(category => res.json(category))
                .catch(error => this.handleError(res, error));
        };
    }
}
exports.ProductsController = ProductsController;
