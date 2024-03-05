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
exports.ImageDatasourceImpl = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const config_1 = require("../../config");
const domain_1 = require("../../domain");
class ImageDatasourceImpl {
    constructor(uuid = config_1.Uuid.v4) {
        this.uuid = uuid;
        this.logger = (0, config_1.builderLogger)('ImageDatasourceImpl.js');
    }
    getImage(type, img) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imagePath = path_1.default.resolve(__dirname, `../../../uploads/${type}/${img}`);
                if (!fs_1.default.existsSync(imagePath)) {
                    throw domain_1.CustomError.badRequest('Image not found');
                }
                return imagePath;
            }
            catch (error) {
                this.logger.error(`${error}`);
                //console.error({ error });
                throw error;
            }
        });
    }
}
exports.ImageDatasourceImpl = ImageDatasourceImpl;
