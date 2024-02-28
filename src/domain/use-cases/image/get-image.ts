
import { UploadedFile } from "express-fileupload";
import {  FileUploadRepository, ImageRepository } from "../../repositories";

export interface GetImageUseCase {
    execute(type: string, image: string): Promise<any>;
}

export class GetImage implements GetImageUseCase {

    constructor(
        private readonly repository: ImageRepository
    ){}

    execute(type: string, image: string): Promise<any> {
        return this.repository.getImage(type, image);
    }

}