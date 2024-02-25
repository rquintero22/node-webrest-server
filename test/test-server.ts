import { envs } from '../src/config/env.config';
import { AppRoutes } from '../src/presentation/routes';
import { Server } from '../src/presentation/server';

export const testServer = new Server({
    port: envs.PORT,
    public_path: envs.PUBLIC_PATH,
    routes: AppRoutes.routes
});