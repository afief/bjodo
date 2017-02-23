import Koa from 'koa';
import qs from 'koa-qs';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

import routes from './Http/Routes.js';

export default class Core {
    constructor() {
        const router = new Router();
        this.app = new Koa();
        qs(this.app, 'first');

        this.app.use(bodyParser({
            enableTypes: [ 'json', 'form' ],
            formLimit: '10mb',
            jsonLimit: '10mb'
        }));

        this.app.use(this.json);

        routes(router);
        this.app.use(router.routes())
            .use(router.allowedMethods({ throw: true }));

        this.app.on('error', (err) => {
            console.log('Uncaught exception', err.message);
        });
    }

    async json(ctx, next) {
        ctx.json = (payload, status = 200) => {
            ctx.type = 'application/json';
            ctx.status = status;
            ctx.body = payload;
        };
        await next();
    }

    listen(port, fn) {
        this.app.listen(port, (err) => {
            if (fn) {
                return fn(err);
            }
            console.log(err || `i\`m listening ~> ${port}`);
        });
    }
}

const core = new Core();
const port = 3000;
core.listen(port);