import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';

import { _multer } from '../../lib/multer.lib.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { ChecklistAnswerController } from './checklistAnswer.controller.js';
import { ChecklistAnswerService } from './checklistAnswer.service.js';

export const checklistAnswerRoute = Router({ caseSensitive: true, strict: true });

const checklistAnswerService = new ChecklistAnswerService();
const checklistAnswerController = new ChecklistAnswerController(checklistAnswerService);

checklistAnswerRoute.post(
  '/createChecklistAnswer',
  [authMiddleware, _multer.singleUploadImageOnly],
  (req: Request, res: Response, next: NextFunction) => {
    checklistAnswerController.createChecklistAnswer(req, res, next);
  }
);
