import type { Request, Response } from 'express';
import { Router } from 'express';
import httpstatus from 'http-status';

export const healthRoute = Router({ caseSensitive: true, strict: true });

healthRoute.get('/', [], (req: Request, res: Response) => {
  res.status(httpstatus.OK).send('api: v1, health OK');
});
