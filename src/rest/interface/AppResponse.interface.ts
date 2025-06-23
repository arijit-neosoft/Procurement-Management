import type { Response } from 'express';

export interface IServiceResponse {
  success: boolean;
  message: string;
  data: object;
}

export interface IAppResponseHandlerInput {
  res: Response;
  statusCode: number;
  responseType: IServiceResponse;
}
