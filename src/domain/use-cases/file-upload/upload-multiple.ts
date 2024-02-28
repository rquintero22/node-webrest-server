
import { UploadedFile } from "express-fileupload";
import {  FileUploadRepository } from "../../repositories";

export interface UploadMultipleUseCase {
    execute(file: UploadedFile[], folder: string, validExtensions: string[]): Promise<any>;
}

export class UploadMultiple implements UploadMultipleUseCase {

    constructor(
        private readonly repository: FileUploadRepository
    ){}

    execute(file: UploadedFile[], folder: string, validExtensions: string[]): Promise<any> {
        return this.repository.uploadMultiple(file, folder, validExtensions);
    }

}