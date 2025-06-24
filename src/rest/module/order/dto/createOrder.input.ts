import { z } from 'zod';
import { OrderStatus } from '../../../model/order.model.js';

export const createOrderInputSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().default(''),
  clientId: z.string().nonempty(),
  procurementManagerId: z.string().nonempty(),
  inspectionManagerId: z.string().nonempty().nullable(),
  checklistId: z.string().nonempty().nullable(),
  checklistAnswerId: z.string().nonempty().nullable(),
  orderStatus: z.enum([OrderStatus.CREATED, OrderStatus.INSPECTION_DONE, OrderStatus.CONFIRMED], {
    message: 'orderStatus must be one of the predefined OrderStatus',
  }),
});

export type ICreateOrderInput = z.input<typeof createOrderInputSchema>;
