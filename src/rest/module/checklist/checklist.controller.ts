import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Roles } from '../../decorator/roles.decorator.js';
import { AppException } from '../../lib/appException.lib.js';
import { AppResponse } from '../../lib/appResponse.lib.js';
import { Role } from '../../model/user.model.js';
import type { ChecklistService } from './checklist.service.js';
import { createChecklistInputSchema } from './dto/createChecklist.input.js';

export class ChecklistController {
  constructor(private readonly checklistService: ChecklistService) {}

  @Roles(Role.PROCUREMENT_MANAGER)
  async createChecklist(req: Request, res: Response, next: NextFunction) {
    try {
      const validationResult = createChecklistInputSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new AppException('createChecklist validation failed', httpStatus.BAD_REQUEST, validationResult.error);
      }

      const serviceResponse = await this.checklistService.createChecklist(req.user, validationResult.data);

      AppResponse.responseHandler({ res: res, statusCode: httpStatus.CREATED, responseType: serviceResponse });
    } catch (error) {
      next(error);
    }
  }

  @Roles(Role.ADMIN, Role.PROCUREMENT_MANAGER, Role.CLIENT)
  async getChecklists(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await this.checklistService.getChecklists(req.user);

      AppResponse.responseHandler({ res: res, statusCode: httpStatus.OK, responseType: serviceResponse });
    } catch (error) {
      next(error);
    }
  }
}
