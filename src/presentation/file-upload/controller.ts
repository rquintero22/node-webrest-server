import { Request, Response } from 'express';
import { CustomError, FileUploadRepository, UploadMultiple, UploadSingle } from "../../domain";
import { UploadedFile } from 'express-fileupload';

export class FileUploadController {
    constructor(
        private readonly fileUploadRepository: FileUploadRepository
    ) {}

    private handleError = (res: Response, error: unknown) => {
        if(error instanceof CustomError) {
            res.status(error.statusCode).json({error: error.message});
            return;
        } 
        res.status(500).json({error: 'Internal server error - check logs'});
    }

    uploadFile = (req: Request, res: Response) => {
       
        const type = req.params.type;
        const file = req.body.files.at(0) as UploadedFile;

       new UploadSingle(this.fileUploadRepository)
                .execute(file, `uploads/${type}`, ['png', 'jpg', 'jpeg', 'gif'])
                .then(upload => res.json(upload))
                .catch(error => this.handleError(res, error));
    }

    uploadMultipleFiles = (req: Request, res: Response) => {
       
        const type = req.params.type;

        const files = req.body.files as UploadedFile[];

       new UploadMultiple(this.fileUploadRepository)
                .execute(files, `uploads/${type}`, ['png', 'jpg', 'jpeg', 'gif'])
                .then(upload => res.json(upload))
                .catch(error => this.handleError(res, error));
    }
}