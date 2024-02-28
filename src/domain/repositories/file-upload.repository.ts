import { UploadedFile } from "express-fileupload";

export abstract class FileUploadRepository {
    abstract uploadSingle(file: UploadedFile, folder: string, validExtensions: string[]): Promise<any>;
    abstract uploadMultiple(file: UploadedFile[], folder: string, validExtensions: string[]): Promise<any>;

}