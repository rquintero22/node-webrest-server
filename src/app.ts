import { envs } from "./config/env.config";
import { Server } from "./presentation/server";

(() => {
    main();
})();

function main() {
    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH
    });
    server.start();
}