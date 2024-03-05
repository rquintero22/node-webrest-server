"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const domain_1 = require("../../domain");
const image_1 = require("../../domain/use-cases/image");
class ImageController {
    constructor(imageRepository) {
        this.imageRepository = imageRepository;
        this.handleError = (res, error) => {
            if (error instanceof domain_1.CustomError) {
                res.status(error.statusCode).json({ error: error.message });
                return;
            }
            res.status(500).json({ error: 'Internal server error - check logs' });
        };
        this.getImage = (req, res) => {
            const { type = '', img = '' } = req.params;
            new image_1.GetImage(this.imageRepository)
                .execute(type, img)
                .then(image => res.sendFile(image))
                .catch(error => this.handleError(res, error));
        };
    }
}
exports.ImageController = ImageController;
