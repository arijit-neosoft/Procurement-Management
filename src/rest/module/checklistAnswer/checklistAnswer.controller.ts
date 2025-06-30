import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Roles } from '../../decorator/roles.decorator.js';
import { AppException } from '../../lib/appException.lib.js';
import { AppResponse } from '../../lib/appResponse.lib.js';
import { Role } from '../../model/user.model.js';
import type { ChecklistAnswerService } from './checklistAnswer.service.js';
import { createChecklistAnswerInputSchema } from './dto/createChecklistAnswer.input.js';

export class ChecklistAnswerController {
  constructor(private readonly checklistAnswerService: ChecklistAnswerService) {}

  @Roles(Role.INSPECTION_MANAGER)
  async createChecklistAnswer(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) throw new AppException('createChecklist - file not available', httpStatus.BAD_REQUEST, {});
      if (!req.body.payload) throw new AppException('createChecklist - payload not available', httpStatus.BAD_REQUEST, {});

      const filePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      console.log('[createChecklistAnswer]: file:', filePath);

      const validationResult = createChecklistAnswerInputSchema.safeParse(JSON.parse(req.body.payload));

      if (!validationResult.success) {
        throw new AppException('createChecklist validation failed', httpStatus.BAD_REQUEST, validationResult.error);
      }

      const serviceResponse = await this.checklistAnswerService.createChecklistAnswer(req.user, req.file, filePath, validationResult.data);

      AppResponse.responseHandler({ res: res, statusCode: httpStatus.CREATED, responseType: serviceResponse });
    } catch (error) {
      next(error);
    }
  }
}
