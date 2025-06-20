import { model, type ObjectId, Schema } from 'mongoose';

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
  password_hash: string;
  dob: string;
  phoneNumber: string;
  verified: boolean;
  active: boolean;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    dob: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    verified: { type: Boolean, default: false, required: true },
    active: { type: Boolean, default: true, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.ADMIN, required: true },
  },
  { timestamps: true }
);

export const userModel = model<IUser>('user', schema, 'user');
