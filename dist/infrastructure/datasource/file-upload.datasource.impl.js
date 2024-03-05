"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadDatasourceImpl = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const config_1 = require("../../config");
const domain_1 = require("../../domain");
class FileUploadDatasourceImpl {
    constructor(uuid = config_1.Uuid.v4) {
        this.uuid = uuid;
        this.logger = (0, config_1.builderLogger)('FileUploadDatasourceImpl.js');
    }
    uploadSingle(file, folder = 'uploads', validExtensions = ['png', 'jpg', 'jpeg', 'gif']) {
        return new Promise((resolve, reject) => {
            var _a;
            try {
                const fileExtension = (_a = file.mimetype.split('/').at(1)) !== null && _a !== void 0 ? _a : '';
                if (!validExtensions.includes(fileExtension)) {
                    throw domain_1.CustomError.badRequest(`Invalid extension: ${fileExtension}, valid ones ${validExtensions.join(', ')}`);
                }
                const destination = path_1.default.resolve(__dirname + '../../../../' + folder);
                this.checkFolder(destination);
                const fileName = `${this.uuid()}.${fileExtension}`;
                file.mv(`${destination}/${fileName}`);
                resolve({ fileName });
            }
            catch (error) {
                //console.error({ error });
                throw error;
            }
        });
    }
    uploadMultiple(files, folder, validExtensions = ['png', 'jpg', 'jpeg', 'gif']) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileNames = yield Promise.all(files.map(file => this.uploadSingle(file, folder, validExtensions)));
            return fileNames;
        });
    }
    checkFolder(folderPath) {
        if (!fs_1.default.existsSync(folderPath)) {
            fs_1.default.mkdirSync(folderPath);
        }
    }
}
exports.FileUploadDatasourceImpl = FileUploadDatasourceImpl;
