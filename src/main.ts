import cors from 'cors';
import express, { type ErrorRequestHandler, type NextFunction, type Request, type Response } from 'express';
import { config } from './config/config.js';
import { mongodb } from './db/mongodb.js';
import { _router } from './rest/_router.js';

async function main() {
  try {
    /* init */

    const app = express();

    /* db */
    await mongodb();

    /* app router */
    app.use(_router);

    /* middlewares */
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use(
      cors({
        credentials: true,
        methods: ['HEAD,GET,POST,PUT,PATCH,DELETE'],
        origin: [],
      })
    );

    /* start */
    app.listen(config.app.APP_PORT, () => {
      console.log(`server running at: 🚀 http://localhost:${config.app.APP_PORT} 🚀`);
    });
  } catch (error: unknown) {
    console.log('Error', error);
  }
}

main();
