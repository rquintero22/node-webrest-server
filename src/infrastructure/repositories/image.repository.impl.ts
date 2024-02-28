import { UploadedFile } from "express-fileupload";
import { ImageRepository } from "../../domain";
import { ImageDatasource } from "../../domain/datasources";

export class ImageRepositoryImpl implements ImageRepository {

    constructor(
        private readonly datasource: ImageDatasource
    ){}

    getImage(tpye: string, img: string): Promise<any> {
        return this.datasource.getImage(tpye, img);
    }
   

}