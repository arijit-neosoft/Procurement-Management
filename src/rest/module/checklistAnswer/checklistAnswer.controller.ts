import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Roles } from '../../decorator/roles.decorator.js';
import { AppResponse } from '../../lib/appResponse.lib.js';
import { Role } from '../../model/user.model.js';
import type { ChecklistAnswerService } from './checklistAnswer.service.js';

export class ChecklistAnswerController {
  constructor(private readonly checklistAnswerService: ChecklistAnswerService) {}

  @Roles(Role.INSPECTION_MANAGER)
  async createChecklistAnswer(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await this.checklistAnswerService.createChecklistAnswer(req.body);

      AppResponse.responseHandler({ res: res, statusCode: httpStatus.CREATED, responseType: serviceResponse });
    } catch (error) {
      next(error);
    }
  }
}
