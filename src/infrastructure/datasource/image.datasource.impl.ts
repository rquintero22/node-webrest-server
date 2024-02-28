import path from "path";
import fs from 'fs';
import { UploadedFile } from "express-fileupload";
import { Uuid } from "../../config";
import { CustomError } from "../../domain";
import { ImageDatasource } from "../../domain/datasources";

export class ImageDatasourceImpl implements ImageDatasource {

    constructor(private readonly uuid = Uuid.v4) { }

    async getImage(type: string, img: string): Promise<any> {
        
            try {
              
                const imagePath = path.resolve(__dirname, `../../../uploads/${type}/${img}`);
    
                if(!fs.existsSync(imagePath)) {
                    throw CustomError.badRequest('Image not found');
                }

                return imagePath;

            } catch (error) {
                console.error({ error });
                throw error;
            }
        
    }
   

}