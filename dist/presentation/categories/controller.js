"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const dtos_1 = require("../../domain/dtos");
const domain_1 = require("../../domain");
class CategoriesController {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
        this.handleError = (res, error) => {
            if (error instanceof domain_1.CustomError) {
                res.status(error.statusCode).json({ error: error.message });
                return;
            }
            res.status(500).json({ error: 'Internal server error - check logs' });
        };
        this.getCategories = (req, res) => {
            const { page = 1, limit = 10 } = req.query;
            const [error, paginationDto] = dtos_1.PaginationDto.create(+page, +limit);
            if (error)
                return res.status(400).json({ error });
            new domain_1.GetCategories(this.categoryRepository)
                .execute(paginationDto)
                .then(category => res.json(category))
                .catch(error => this.handleError(res, error));
        };
        this.getCategoryById = (req, res) => {
            const id = +req.params.id;
            new domain_1.GetCategory(this.categoryRepository)
                .execute(id)
                .then(category => res.json(category))
                .catch(error => this.handleError(res, error));
        };
        this.createCategory = (req, res) => {
            const [error, createCategoryDto] = dtos_1.CreateCategoryDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            new domain_1.CreateCategory(this.categoryRepository)
                .execute(createCategoryDto, req.body.user)
                .then(category => res.status(201).json(category))
                .catch(error => this.handleError(res, error));
        };
        this.updateCategory = (req, res) => {
            const id = +req.params.id;
            const [error, updateCategoryDto] = dtos_1.UpdateCategoryDto.create(Object.assign(Object.assign({}, req.body), { id }));
            if (error)
                return res.status(400).json({ error });
            new domain_1.UpdateCategory(this.categoryRepository)
                .execute(updateCategoryDto)
                .then(category => res.json(category))
                .catch(error => this.handleError(res, error));
        };
        this.deleteCategory = (req, res) => {
            const id = +req.params.id;
            new domain_1.DeleteCategory(this.categoryRepository)
                .execute(id)
                .then(category => res.json(category))
                .catch(error => this.handleError(res, error));
        };
    }
}
exports.CategoriesController = CategoriesController;
