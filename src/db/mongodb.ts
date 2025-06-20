import { connect } from 'mongoose';
import { config } from '../config/config.js';

export async function mongodb() {
  const uri = config.mongodb.MONGODB_URI;
  await connect(uri);

  console.log('mongodb connection success');
}
