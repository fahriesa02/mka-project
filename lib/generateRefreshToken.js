import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const env = dotenv.config().parsed;

export default (payload) => {
  return jwt.sign(payload, env.REFRESH_TOKEN, { expiresIn: env.REFRESH_TOKEN_EXPIRE });
}