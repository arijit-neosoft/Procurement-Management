import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { AppResponse } from '../../lib/appResponse.lib.js';
import type { ChecklistAnswerService } from './checklistAnswer.service.js';

export class ChecklistAnswerController {
  constructor(private readonly checklistAnswerService: ChecklistAnswerService) {}

  async createChecklistAnswer(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await this.checklistAnswerService.createChecklistAnswer();

      AppResponse.responseHandler({ res: res, statusCode: httpStatus.CREATED, responseType: serviceResponse });
    } catch (error) {
      next(error);
    }
  }
}
