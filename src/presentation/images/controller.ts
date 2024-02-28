import { Request, Response } from 'express';
import { CustomError, ImageRepository } from "../../domain";
import { GetImage } from '../../domain/use-cases/image';

export class ImageController {
    constructor(
        private readonly imageRepository: ImageRepository
    ) {}

    private handleError = (res: Response, error: unknown) => {
        if(error instanceof CustomError) {
            res.status(error.statusCode).json({error: error.message});
            return;
        } 
        res.status(500).json({error: 'Internal server error - check logs'});
    }

    getImage = (req: Request, res: Response) => {
       
        const {type = '', img = ''} = req.params;

       new GetImage(this.imageRepository)
                .execute(type, img)
                .then(image => res.sendFile(image))
                .catch(error => this.handleError(res, error));
    }

   
}