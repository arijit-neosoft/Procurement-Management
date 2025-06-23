import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { AppException } from '../../lib/appException.lib.js';
import { AppResponse } from '../../lib/appResponse.lib.js';
import type { AuthService } from './auth.service.js';
import { signupAdminSchema } from './dto/signupAdmin.input.js';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async signupAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const validationResult = signupAdminSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new AppException('Signup validation failed', httpStatus.BAD_REQUEST, validationResult.error);
      }

      const appResponse = await this.authService.signupAdmin(validationResult.data);

      AppResponse.responseHandler({
        res: res,
        statusCode: httpStatus.CREATED,
        responseType: appResponse,
      });
    } catch (error) {
      next(error);
    }
  }
}
