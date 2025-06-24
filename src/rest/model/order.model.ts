import { model, type ObjectId, Schema } from 'mongoose';

export enum OrderStatus {
  CREATED = 'CREATED',
  INSPECTION_DONE = 'INSPECTION_DONE',
  CONFIRMED = 'CONFIRMED',
}

export interface IOrder {
  _id: ObjectId;
  name: string;
  description: string;
  client: ObjectId;
  procurementManager: ObjectId;
  inspectionManager: ObjectId | null;
  checklist: ObjectId | null;
  checklistAnswer: ObjectId | null;
  orderStatus: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    client: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    procurementManager: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    inspectionManager: { type: Schema.Types.ObjectId, ref: 'user', default: null },
    checklist: { type: Schema.Types.ObjectId, ref: 'checklist', default: null },
    checklistAnswer: { type: Schema.Types.ObjectId, ref: 'checklistAnswer', default: null },
    orderStatus: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.CREATED },
  },
  { timestamps: true }
);

orderSchema.index({ name: 1, client: 1 }, { unique: true });

export const orderModel = model<IOrder>('order', orderSchema, 'order');
