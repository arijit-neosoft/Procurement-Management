import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Roles } from '../../decorator/roles.decorator.js';
import { AppResponse } from '../../lib/appResponse.lib.js';
import { Role } from '../../model/user.model.js';
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

  @Roles(Role.ADMIN, Role.PROCUREMENT_MANAGER)
  async getIMs(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await this.userService.getIMs(req.user);

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
