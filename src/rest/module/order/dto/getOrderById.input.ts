import { z } from 'zod';

export const getOrderByIdInputSchema = z.object({
  orderId: z.string().nonempty().regex(/^[a-fA-F0-9]{24}$/, 'Invalid MongoDB ObjectId'),
});

export type IGetOrderByIdInput = z.input<typeof getOrderByIdInputSchema>;
