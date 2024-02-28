import { UploadedFile } from "express-fileupload";
import { FileUploadRepository } from "../../domain";
import { FileUploadDatasource } from "../../domain/datasources";

export class FileUploadRepositoryImpl implements FileUploadRepository {

    constructor(
        private readonly datasource: FileUploadDatasource
    ){}

    uploadSingle(file: UploadedFile, folder: string, validExtensions: string[]): Promise<any> {
        return this.datasource.uploadSingle(file, folder, validExtensions);
    }
    uploadMultiple(file: UploadedFile[], folder: string, validExtensions: string[]): Promise<any> {
        return this.datasource.uploadMultiple(file, folder, validExtensions);
    }

}