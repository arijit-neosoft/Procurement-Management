import { z } from 'zod';

export const verifyLinkInputSchema = z.object({
  email: z
    .string()
    .min(1, 'Email must be at least 1 character long')
    .max(100, 'Email must be at most 100 characters long')
    .email('Invalid email address'),
  password: z.string().min(1, 'Password must be at least 1 character long').max(100, 'Password must be at most 100 characters long'),
});

export type IVerifyLinkInput = z.input<typeof verifyLinkInputSchema>;
