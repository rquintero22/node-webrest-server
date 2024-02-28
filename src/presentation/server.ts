import path from 'path';
import express, { Router } from 'express';
import compression from 'compression';
import fileUpload from 'express-fileupload';

interface Options {
    port: number;
    routes: Router,
    public_path?: string;
}

export class Server {

    public readonly app = express();
    private serverListener?: any;
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, routes, public_path = 'public' }  = options;

        this.port = port;
        this.publicPath = public_path;
        this.routes = routes
    }

    async start() {

        // Middlewares
        this.app.use(express.json()); // habilita raw
        this.app.use(express.urlencoded({extended: true})); // habilita x-www-form-url-enconded
        this.app.use(compression());
        this.app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 }
        }));

        // /* public folder
        this.app.use(express.static(this.publicPath));

        // Routes
        this.app.use(this.routes);

        // * SPA
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${ this.publicPath }/index.html`);
            res.sendFile(indexPath);
            return;
        });

        this.serverListener = this.app.listen(this.port, ()=> {
            console.log(`Server running on port ${this.port}`);
        });

    }

    public close() {
        this.serverListener?.close();
    }
}