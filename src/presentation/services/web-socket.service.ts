import { Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import { builderLogger } from '../../config';

interface Options {
    server: Server;
    path?: string;
}

export class WebSocketService {
    private static _instance: WebSocketService;
    private webSocketServer: WebSocketServer

    private readonly logger = builderLogger('WebSocketService.js');

    private constructor(options: Options) {
        const {server, path = '/ws'} = options;

        this.webSocketServer = new WebSocketServer({server, path});
        
        this.start();
    }

    static get instance(): WebSocketService {
        if(!WebSocketService._instance) {
            throw 'WebSocketServer is not initialized';
        }

        return WebSocketService._instance;
    }

    static initiWebSocketServer(options: Options) {
        WebSocketService._instance = new WebSocketService(options);
    }

    public start() {
        this.webSocketServer.on('connection', (ws: WebSocket) => {
            //console.log('cliente connected');
            this.logger.log('client connected');

            //ws.on('close', () => console.log('Client disconneted'));
            ws.on('close', () => this.logger.log('Client disconneted'));
        });
    }

}