"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeMiddleware = void 0;
class TypeMiddleware {
    static validTypes(validTypes) {
        return (req, res, next) => {
            var _a;
            const type = (_a = req.url.split('/').at(2)) !== null && _a !== void 0 ? _a : '';
            if (!validTypes.includes(type)) {
                return res.status(400).json({ error: `Invalid type: ${type}, valid ones ${validTypes.join(', ')}` });
            }
            next();
        };
    }
}
exports.TypeMiddleware = TypeMiddleware;
