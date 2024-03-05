import { createServer } from 'http';
import { envs } from "./config/env.config";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
import { WebSocketService } from './presentation/services/web-socket.service';
import { builderLogger } from './config';

(() => {
    main();
})();

function main() {
    const logger = builderLogger('main.js');
    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
        routes: AppRoutes.routes
    });

    const httpServer =  createServer(server.app);
    WebSocketService.initiWebSocketServer({server: httpServer});

    httpServer.listen(envs.PORT, () => {
    //console.log(`Server running on port ${envs.PORT}`);
        logger.log(`Server running on port ${envs.PORT}`);
    });
}