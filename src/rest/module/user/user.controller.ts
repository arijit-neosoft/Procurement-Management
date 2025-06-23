import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { AppResponse } from '../../lib/appResponse.lib.js';
import type { UserService } from './user.service.js';

export class UserController {
  constructor(private readonly userService: UserService) {}

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await this.userService.getProfile(req.user);

      AppResponse.responseHandler({
        res: res,
        statusCode: httpStatus.OK,
        responseType: serviceResponse,
      });
    } catch (error) {
      next(error);
    }
  }
}
