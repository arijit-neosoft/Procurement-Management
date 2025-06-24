import { type NextFunction, type Request, type Response, Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { ChecklistAnswerController } from './checklistAnswer.controller.js';
import { ChecklistAnswerService } from './checklistAnswer.service.js';

export const checklistAnswerRoute = Router({ caseSensitive: true, strict: true });

const checklistAnswerService = new ChecklistAnswerService();
const checklistAnswerController = new ChecklistAnswerController(checklistAnswerService);

checklistAnswerRoute.post('/createChecklistAnswer', [authMiddleware], (req: Request, res: Response, next: NextFunction) => {
  checklistAnswerController.createChecklistAnswer(req, res, next);
});
