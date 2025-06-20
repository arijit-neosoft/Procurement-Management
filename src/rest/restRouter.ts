import { Router } from 'express';
import { healthRoute } from './module/health/health.route.js';

export const restRouter = Router({ caseSensitive: true, strict: true });

restRouter.use('/', healthRoute);
