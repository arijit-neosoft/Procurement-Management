import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

import { config } from '../../config/config.js';
import { _model } from '../_model.js';
import type { IJwtPayload } from '../interface/jwt.interface.js';
import { AppException } from '../lib/appException.lib.js';
import type { IUser } from '../model/user.model.js';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const accessToken = req.headers?.authorization?.slice(7);

    if (!accessToken) {
      throw new AppException('Authentication Failed', httpStatus.UNAUTHORIZED, {});
    }

    const decoded = jwt.verify(accessToken, config.jwt.JWT_ACCESS_TOKEN_SECRET) as IJwtPayload;

    const user = await _model.userModel.findOne({ email: decoded.email });

    if (!user) {
      throw new AppException('Invalid user', httpStatus.UNAUTHORIZED, {});
    }

    req.user = user.toObject();

    next();
  } catch (error) {
    try {
      AppException.exceptionHandler(error, 'Authentication Failed', httpStatus.UNAUTHORIZED, {});
    } catch (error) {
      next(error);
    }
  }
}
