

export abstract class ImageDatasource {

    abstract getImage(type: string, img: string): Promise<any>;

}