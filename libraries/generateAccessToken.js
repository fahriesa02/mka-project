import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const env = dotenv.config().parsed;

export default (payload) => {
  return jwt.sign(payload, env.ACCESS_TOKEN, { expiresIn: env.ACCESS_TOKEN_EXPIRE });
}