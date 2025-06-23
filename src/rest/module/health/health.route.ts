import { type NextFunction, type Request, type Response, Router } from 'express';
import httpstatus from 'http-status';

export const healthRoute = Router({ caseSensitive: true, strict: true });

healthRoute.get('/', [], (req: Request, res: Response, next: NextFunction) => {
  res.status(httpstatus.OK).send('v1 OK');
});

healthRoute.get('/health', [], (req: Request, res: Response, next: NextFunction) => {
  res.status(httpstatus.OK).json({ success: true, api: 'rest', message: 'rest health check', data: {} });
});
