import { z } from 'zod';

import { OrderStatus } from '../../../model/order.model.js';

export const updateOrderStatusInputSchema = z.object({
  orderId: z
    .string()
    .nonempty()
    .regex(/^[a-fA-F0-9]{24}$/, 'Invalid MongoDB ObjectId'),
  orderStatus: z.enum([OrderStatus.CREATED, OrderStatus.INSPECTION_DONE, OrderStatus.CONFIRMED], {
    message: 'orderStatus must be one of the predefined OrderStatus',
  }),
});

export type IUpdateOrderStatusInput = z.input<typeof updateOrderStatusInputSchema>;
