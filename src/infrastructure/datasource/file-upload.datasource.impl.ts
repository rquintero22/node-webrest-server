import path from "path";
import fs from 'fs';
import { UploadedFile } from "express-fileupload";
import { FileUploadDatasource } from "../../domain/datasources";
import { Uuid } from "../../config";
import { CustomError } from "../../domain";

export class FileUploadDatasourceImpl implements FileUploadDatasource {

    constructor(private readonly uuid = Uuid.v4) { }

    uploadSingle(file: UploadedFile, folder: string = 'uploads', validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']): Promise<any> {
        return new Promise((resolve, reject) => {
            try {


                const fileExtension = file.mimetype.split('/').at(1) ?? '';
                if(!validExtensions.includes(fileExtension)){
                    throw CustomError.badRequest(`Invalid extension: ${fileExtension}, valid ones ${validExtensions.join(', ')}`);
                }

                const destination = path.resolve(__dirname + '../../../../' + folder);
                this.checkFolder(destination);

                const fileName = `${this.uuid()}.${fileExtension}`;

                file.mv(`${destination}/${fileName}`);
                resolve({ fileName });

            } catch (error) {
                console.error({ error });
                throw error;
            }
        });
    }
    async uploadMultiple(files: UploadedFile[], folder: string, validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']): Promise<any> {
        const fileNames = await Promise.all(
            files.map(file => this.uploadSingle(file, folder, validExtensions))
        );

        return fileNames;
    }


    private checkFolder(folderPath: string) {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
    }

}