import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { AppException } from '../../lib/appException.lib.js';
import { AppResponse } from '../../lib/appResponse.lib.js';
import type { AuthService } from './auth.service.js';
import { createUsersByAdminInputSchema } from './dto/createUsersByAdmin.input.js';
import { signinInputSchema } from './dto/signin.input.js';
import { signupAdminSchema } from './dto/signupAdmin.input.js';
import { verifyInputSchema } from './dto/verify.input.js';
import { verifyLinkInputSchema } from './dto/verifyLInk.input.js';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async signupAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const validationResult = signupAdminSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new AppException('signupAdmin validation failed', httpStatus.BAD_REQUEST, validationResult.error);
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

  async verifyLink(req: Request, res: Response, next: NextFunction) {
    try {
      const validationResult = verifyLinkInputSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new AppException('verifyLink validation failed', httpStatus.BAD_REQUEST, validationResult.error);
      }

      const appResponse = await this.authService.verifyLink(validationResult.data);

      AppResponse.responseHandler({
        res: res,
        statusCode: httpStatus.OK,
        responseType: appResponse,
      });
    } catch (error) {
      next(error);
    }
  }

  async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const validationResult = verifyInputSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new AppException('verify validation failed', httpStatus.BAD_REQUEST, validationResult.error);
      }

      const appResponse = await this.authService.verify(validationResult.data);

      AppResponse.responseHandler({
        res: res,
        statusCode: httpStatus.OK,
        responseType: appResponse,
      });
    } catch (error) {
      next(error);
    }
  }

  async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const validationResult = signinInputSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new AppException('signin validation failed', httpStatus.BAD_REQUEST, validationResult.error);
      }

      const appResponse = await this.authService.signin(validationResult.data);

      AppResponse.responseHandler({
        res: res,
        statusCode: httpStatus.OK,
        responseType: appResponse,
      });
    } catch (error) {
      next(error);
    }
  }

  async createUsersByAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const validationResult = createUsersByAdminInputSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new AppException('createUsersByAdmin validation failed', httpStatus.BAD_REQUEST, validationResult.error);
      }

      const appResponse = await this.authService.createUsersByAdmin(validationResult.data);

      AppResponse.responseHandler({
        res: res,
        statusCode: httpStatus.OK,
        responseType: appResponse,
      });
    } catch (error) {
      next(error);
    }
  }
}
