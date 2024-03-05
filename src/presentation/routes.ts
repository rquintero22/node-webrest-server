import { Router } from "express";
import { TodoRoutes } from "./todos/routes";
import { AuthRoutes } from "./auth/routes";
import { CategoryRoutes } from "./categories/routes";
import { ProductRoutes } from "./products/routes";
import { FileUploadRoutes } from "./file-upload/routes";
import { ImageRoutes } from "./images/routes";
import { TicketRoutes } from "./tickets/routes";

export class AppRoutes {
    static get routes() : Router {
        const router = Router();

        router.use('/api/todos', TodoRoutes.routes);
        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/categories', CategoryRoutes.routes);
        router.use('/api/products', ProductRoutes.routes);
        router.use('/api/upload', FileUploadRoutes.routes);
        router.use('/api/images', ImageRoutes.routes);
        router.use('/api/ticket', TicketRoutes.routes);

        return router;
    }
}