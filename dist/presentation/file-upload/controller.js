"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadController = void 0;
const domain_1 = require("../../domain");
class FileUploadController {
    constructor(fileUploadRepository) {
        this.fileUploadRepository = fileUploadRepository;
        this.handleError = (res, error) => {
            if (error instanceof domain_1.CustomError) {
                res.status(error.statusCode).json({ error: error.message });
                return;
            }
            res.status(500).json({ error: 'Internal server error - check logs' });
        };
        this.uploadFile = (req, res) => {
            const type = req.params.type;
            const file = req.body.files.at(0);
            new domain_1.UploadSingle(this.fileUploadRepository)
                .execute(file, `uploads/${type}`, ['png', 'jpg', 'jpeg', 'gif'])
                .then(upload => res.json(upload))
                .catch(error => this.handleError(res, error));
        };
        this.uploadMultipleFiles = (req, res) => {
            const type = req.params.type;
            const files = req.body.files;
            new domain_1.UploadMultiple(this.fileUploadRepository)
                .execute(files, `uploads/${type}`, ['png', 'jpg', 'jpeg', 'gif'])
                .then(upload => res.json(upload))
                .catch(error => this.handleError(res, error));
        };
    }
}
exports.FileUploadController = FileUploadController;
