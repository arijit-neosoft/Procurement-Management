import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { AppException } from '../lib/appException.lib.js';

export function Roles(...allowedRoles: string[]) {
  return (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      try {
        if (!req.user) {
          throw new AppException('Unauthenticated Route: Bad use of @Roles()', httpStatus.FORBIDDEN, {});
        }

        if (!allowedRoles.includes(req.user.role)) {
          throw new AppException(`Access denied: Invalid role: ${req.user.role}`, httpStatus.FORBIDDEN, {});
        }

        return await originalMethod.apply(this, [req, res, next]);
      } catch (error) {
        next(error);
      }
    };

    return descriptor;
  };
}
