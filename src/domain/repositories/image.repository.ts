
export abstract class ImageRepository {

    abstract getImage(type: string, img: string): Promise<any>;

}