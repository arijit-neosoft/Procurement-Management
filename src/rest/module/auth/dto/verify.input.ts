import { z } from 'zod';

export const verifyInputSchema = z.object({
  verify_token: z.string().max(200, 'token must be at most 200 characters long'),
});

export type IVerifyInput = z.input<typeof verifyInputSchema>;
