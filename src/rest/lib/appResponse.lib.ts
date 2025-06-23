import { config } from '../../config/config.js';
import type { IAppResponseHandlerInput } from '../interface/appResponse.interface.js';

export class AppResponse {
  public name = 'AppResponse';

  public static responseHandler(input: IAppResponseHandlerInput) {
    const { res, statusCode, responseType } = input;

    return res.status(statusCode).json({
      environment: config.app.APP_ENV,
      statusCode,
      success: responseType.success,
      message: responseType.message,
      data: responseType.data,
    });
  }
}
