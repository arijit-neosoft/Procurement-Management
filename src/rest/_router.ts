import { Router } from 'express';
import { healthRoute } from './module/health/health.route.js';

export const _router = Router({ caseSensitive: true, strict: true });

_router.use('/', healthRoute);
