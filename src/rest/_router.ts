import { Router } from 'express';
import { authRoute } from './module/auth/auth.route.js';
import { checklistRoute } from './module/checklist/checklist.route.js';
import { healthRoute } from './module/health/health.route.js';
import { orderRoute } from './module/order/order.route.js';
import { userRoute } from './module/user/user.route.js';

export const _router = Router({ caseSensitive: true, strict: true });

_router.use('/', healthRoute);
_router.use('/auth', authRoute);
_router.use('/user', userRoute);
_router.use('/order', orderRoute);
_router.use('/checklist', checklistRoute);
