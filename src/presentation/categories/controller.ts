
import { Request, Response } from 'express';
import { CreateCategoryDto, PaginationDto, UpdateCategoryDto } from '../../domain/dtos';
import { CustomError, CategoryRepository, GetCategory, CreateCategory, UpdateCategory, DeleteCategory, GetCategories } from '../../domain';

export class CategoriesController {

    constructor(
        private readonly categoryRepository: CategoryRepository
    ) {}

    private handleError = (res: Response, error: unknown) => {
        if(error instanceof CustomError) {
            res.status(error.statusCode).json({error: error.message});
            return;
        } 
        res.status(500).json({error: 'Internal server error - check logs'});
    }

    public getCategories = (req: Request, res: Response) => {
        const {page = 1, limit = 10} = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);

        if(error) return res.status(400).json({error});

        new GetCategories(this.categoryRepository)
            .execute(paginationDto!)
            .then(category => res.json(category))
            .catch(error => this.handleError(res, error));
    }

    public getCategoryById = (req: Request, res: Response) => {
        const id = +req.params.id;

        new GetCategory(this.categoryRepository)
            .execute(id)
            .then(category => res.json(category))
            .catch(error => this.handleError(res, error));
    }

    public createCategory = (req: Request, res: Response) => {
        const [error, createCategoryDto] = CreateCategoryDto.create( req.body);

        if (error) return res.status(400).json({error});

        new CreateCategory(this.categoryRepository)
        .execute(createCategoryDto!, req.body.user)
        .then(category => res.status(201).json(category))
       .catch(error => this.handleError(res, error));
    }

    public updateCategory = (req: Request, res: Response) => {

        const id = +req.params.id;

        const [error, updateCategoryDto] = UpdateCategoryDto.create({...req.body, id});
        
        if (error) return res.status(400).json({error});

        new UpdateCategory(this.categoryRepository)
        .execute(updateCategoryDto!)
        .then(category => res.json(category))
       .catch(error => this.handleError(res, error)); 

    }

    public deleteCategory = (req: Request, res: Response) => {
        const id = +req.params.id;

        new DeleteCategory(this.categoryRepository)
            .execute(id)
            .then(category => res.json(category))
           .catch(error => this.handleError(res, error));

    }

}