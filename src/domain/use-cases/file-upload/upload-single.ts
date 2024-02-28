
import { UploadedFile } from "express-fileupload";
import {  FileUploadRepository } from "../../repositories";

export interface UploadSingleUseCase {
    execute(file: UploadedFile, folder: string, validExtensions: string[]): Promise<any>;
}

export class UploadSingle implements UploadSingleUseCase {

    constructor(
        private readonly repository: FileUploadRepository
    ){}

    execute(file: UploadedFile, folder: string, validExtensions: string[]): Promise<any> {
        return this.repository.uploadSingle(file, folder, validExtensions);
    }

}