"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const env_config_1 = require("./config/env.config");
const routes_1 = require("./presentation/routes");
const server_1 = require("./presentation/server");
const web_socket_service_1 = require("./presentation/services/web-socket.service");
const config_1 = require("./config");
(() => {
    main();
})();
function main() {
    const logger = (0, config_1.builderLogger)('main.js');
    const server = new server_1.Server({
        port: env_config_1.envs.PORT,
        public_path: env_config_1.envs.PUBLIC_PATH,
        routes: routes_1.AppRoutes.routes
    });
    const httpServer = (0, http_1.createServer)(server.app);
    web_socket_service_1.WebSocketService.initiWebSocketServer({ server: httpServer });
    httpServer.listen(env_config_1.envs.PORT, () => {
        //console.log(`Server running on port ${envs.PORT}`);
        logger.log(`Server running on port ${env_config_1.envs.PORT}`);
    });
}
