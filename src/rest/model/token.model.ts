import type { ObjectId } from 'mongoose';
import { model, Schema } from 'mongoose';

export enum TokenType {
  VERIFY_TOKEN = 'VERIFY_TOKEN',
  FORGOT_PASSWORD_TOKEN = 'FORGOT_PASSWORD_TOKEN',
  TWO_FA_TOKEN = 'TWO_FA_TOKEN',
}

interface IToken {
  _id: ObjectId;
  email: string;
  token: string;
  tokenType: TokenType;
  issuedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const tokenSchema = new Schema(
  {
    email: { type: String, required: true },
    token: { type: String, required: true },
    tokenType: { type: String, enum: Object.values(TokenType), required: true },
    issuedAt: { type: Date, expires: '10m', default: Date.now, required: true },
  },
  { timestamps: true }
);

tokenSchema.index({ email: 1, tokenType: 1 }, { unique: true });

export const tokenModel = model<IToken>('token', tokenSchema, 'token');
