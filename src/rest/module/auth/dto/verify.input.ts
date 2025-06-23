import { z } from 'zod';

export const verifyInputSchema = z.object({
  verifyToken: z.string().max(500, 'token must be at most 500 characters long'),
});

export type IVerifyInput = z.input<typeof verifyInputSchema>;
