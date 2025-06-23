import cors from 'cors';
import express, { type ErrorRequestHandler, type NextFunction, type Request, type Response } from 'express';
import httpStatus from 'http-status';
import { config } from './config/config.js';
import { mongodb } from './db/mongodb.js';
import { _router } from './rest/_router.js';
import type { AppException } from './rest/lib/appException.lib.js';
import { AppResponse } from './rest/lib/appResponse.lib.js';

async function main() {
  try {
    /* init */

    const app = express();

    /* db */
    await mongodb();

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

    /* app router */
    app.use('/v1', _router);

    /* error handling */
    const errorHandler: ErrorRequestHandler = (error: AppException, req: Request, res: Response, next: NextFunction) => {
      AppResponse.responseHandler({
        res,
        statusCode: error.statusCode ?? httpStatus.INTERNAL_SERVER_ERROR,
        responseType: {
          success: false,
          message: error.message,
          data: error.data,
        },
      });
    };
    app.use(errorHandler);

    /* start */
    app.listen(config.app.APP_PORT, () => {
      console.log(`server running at: 🚀 http://localhost:${config.app.APP_PORT} 🚀`);
    });
  } catch (error: unknown) {
    console.log('Error', error);
  }
}

main();
