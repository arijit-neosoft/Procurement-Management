import { Router } from 'express';
import { authRoute } from './module/auth/auth.route.js';
import { healthRoute } from './module/health/health.route.js';
import { userRoute } from './module/user/user.route.js';

export const _router = Router({ caseSensitive: true, strict: true });

_router.use('/', healthRoute);
_router.use('/auth', authRoute);
_router.use('/user', userRoute);
