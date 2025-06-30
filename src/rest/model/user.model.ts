import type { ObjectId } from 'mongoose';
import { model, Schema } from 'mongoose';

export enum Role {
  ADMIN = 'ADMIN',
  PROCUREMENT_MANAGER = 'PROCUREMENT_MANAGER',
  INSPECTION_MANAGER = 'INSPECTION_MANAGER',
  CLIENT = 'CLIENT',
}

export interface IUser {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  dob: string;
  phoneNumber: string;
  verified: boolean;
  active: boolean;
  role: Role;
  parent: ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    dob: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    verified: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    role: { type: String, enum: Object.values(Role), default: Role.ADMIN },
    parent: { type: Schema.Types.ObjectId, ref: 'user', default: null },
  },
  { timestamps: true }
);

export const userModel = model<IUser>('user', userSchema, 'user');
