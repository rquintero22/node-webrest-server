"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer((req, res) => {
    var _a, _b;
    console.log(req.url);
    if (req.url === '/') {
        const htmlFile = fs_1.default.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile);
        return;
    }
    else if ((_a = req.url) === null || _a === void 0 ? void 0 : _a.endsWith('.css')) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
    }
    else if ((_b = req.url) === null || _b === void 0 ? void 0 : _b.endsWith('.js')) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
    }
    const responseContent = fs_1.default.readFileSync(`./public/${req.url}`, 'utf-8');
    res.end(responseContent);
});
server.listen(8080, () => {
    console.log('Server running on 8080');
});
