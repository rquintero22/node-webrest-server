"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketService = void 0;
const ws_1 = require("ws");
const config_1 = require("../../config");
class WebSocketService {
    constructor(options) {
        this.logger = (0, config_1.builderLogger)('WebSocketService.js');
        const { server, path = '/ws' } = options;
        this.webSocketServer = new ws_1.WebSocketServer({ server, path });
        this.start();
    }
    static get instance() {
        if (!WebSocketService._instance) {
            throw 'WebSocketServer is not initialized';
        }
        return WebSocketService._instance;
    }
    static initiWebSocketServer(options) {
        WebSocketService._instance = new WebSocketService(options);
    }
    start() {
        this.webSocketServer.on('connection', (ws) => {
            //console.log('cliente connected');
            this.logger.log('client connected');
            //ws.on('close', () => console.log('Client disconneted'));
            ws.on('close', () => this.logger.log('Client disconneted'));
        });
    }
}
exports.WebSocketService = WebSocketService;
