import { Router } from 'express';
import { authRoute } from './module/auth/auth.route.js';
import { healthRoute } from './module/health/health.route.js';

export const _router = Router({ caseSensitive: true, strict: true });

_router.use('/health', healthRoute);
_router.use('/auth', authRoute);
