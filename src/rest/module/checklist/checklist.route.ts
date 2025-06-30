import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';

import { authMiddleware } from '../../middleware/auth.middleware.js';
import { ChecklistController } from './checklist.controller.js';
import { ChecklistService } from './checklist.service.js';

export const checklistRoute = Router({ caseSensitive: true, strict: true });

const checklistService = new ChecklistService();
const checklistController = new ChecklistController(checklistService);

checklistRoute.post('/createChecklist', [authMiddleware], (req: Request, res: Response, next: NextFunction) => {
  checklistController.createChecklist(req, res, next);
});

checklistRoute.get('/getChecklists', [authMiddleware], (req: Request, res: Response, next: NextFunction) => {
  checklistController.getChecklists(req, res, next);
});
