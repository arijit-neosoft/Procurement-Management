import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { Roles } from '../../decorator/roles.decorator.js';
import { AppException } from '../../lib/appException.lib.js';
import { AppResponse } from '../../lib/appResponse.lib.js';
import { Role } from '../../model/user.model.js';
import type { AuthService } from './auth.service.js';
import { adminAssignIMtoPMInputSchema } from './dto/adminAssignIMtoPMInput.input.js';
import { createUsersByAdminInputSchema } from './dto/createUsersByAdmin.input.js';
import { createUsersByPMInputSchema } from './dto/createUsersByPM.input.js';
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

      const serviceResponse = await this.authService.signupAdmin(validationResult.data);

      AppResponse.responseHandler({
        res: res,
        statusCode: httpStatus.CREATED,
        responseType: serviceResponse,
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

      const serviceResponse = await this.authService.verifyLink(validationResult.data);

      AppResponse.responseHandler({
        res: res,
        statusCode: httpStatus.OK,
        responseType: serviceResponse,
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

      const serviceResponse = await this.authService.verify(validationResult.data);

      AppResponse.responseHandler({
        res: res,
        statusCode: httpStatus.OK,
        responseType: serviceResponse,
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

      const serviceResponse = await this.authService.signin(validationResult.data);

      AppResponse.responseHandler({
        res: res,
        statusCode: httpStatus.OK,
        responseType: serviceResponse,
      });
    } catch (error) {
      next(error);
    }
  }

  @Roles(Role.ADMIN)
  async createUsersByAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const validationResult = createUsersByAdminInputSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new AppException('createUsersByAdmin validation failed', httpStatus.BAD_REQUEST, validationResult.error);
      }

      const serviceResponse = await this.authService.createUsersByAdmin(req.user._id, validationResult.data);

      AppResponse.responseHandler({
        res: res,
        statusCode: httpStatus.OK,
        responseType: serviceResponse,
      });
    } catch (error) {
      next(error);
    }
  }

  @Roles(Role.ADMIN)
  async adminAssignIMtoPM(req: Request, res: Response, next: NextFunction) {
    try {
      const validationResult = adminAssignIMtoPMInputSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new AppException('adminAssignIMtoPM validation failed', httpStatus.BAD_REQUEST, validationResult.error);
      }

      const serviceResponse = await this.authService.adminAssignIMtoPM(validationResult.data);

      AppResponse.responseHandler({
        res: res,
        statusCode: httpStatus.OK,
        responseType: serviceResponse,
      });
    } catch (error) {
      next(error);
    }
  }

  @Roles(Role.PROCUREMENT_MANAGER)
  async createUsersByPM(req: Request, res: Response, next: NextFunction) {
    try {
      const validationResult = createUsersByPMInputSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new AppException('createUsersByPM validation failed', httpStatus.BAD_REQUEST, validationResult.error);
      }

      const serviceResponse = await this.authService.createUsersByPM(validationResult.data);

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
