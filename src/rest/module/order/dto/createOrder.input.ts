import { z } from 'zod';

import { OrderStatus } from '../../../model/order.model.js';

export const createOrderInputSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().default(''),
  clientId: z
    .string()
    .nonempty()
    .regex(/^[a-fA-F0-9]{24}$/, 'Invalid MongoDB ObjectId'),
  procurementManagerId: z
    .string()
    .nonempty()
    .regex(/^[a-fA-F0-9]{24}$/, 'Invalid MongoDB ObjectId'),
  inspectionManagerId: z
    .string()
    .nonempty()
    .regex(/^[a-fA-F0-9]{24}$/, 'Invalid MongoDB ObjectId')
    .nullable(),
  checklistId: z
    .string()
    .nonempty()
    .regex(/^[a-fA-F0-9]{24}$/, 'Invalid MongoDB ObjectId')
    .nullable(),
  checklistAnswerId: z
    .string()
    .nonempty()
    .regex(/^[a-fA-F0-9]{24}$/, 'Invalid MongoDB ObjectId')
    .nullable(),
  orderStatus: z.enum([OrderStatus.CREATED, OrderStatus.INSPECTION_DONE, OrderStatus.CONFIRMED], {
    message: 'orderStatus must be one of the predefined OrderStatus',
  }),
});

export type ICreateOrderInput = z.input<typeof createOrderInputSchema>;
