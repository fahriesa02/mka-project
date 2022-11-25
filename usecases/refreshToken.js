import generateAccessToken from "../libraries/generateAccessToken.js";
import generateRefreshToken from "../libraries/generateRefreshToken.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const env = dotenv.config().parsed;

export default async (params) => {
  const verify = jwt.verify(params, env.REFRESH_TOKEN);

  if(!verify) return [null, 'INVALID_REFRESH_TOKEN'];

  const payload = { id: verify.id, role: verify.role, storeId: verify.storeId };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return [{ accessToken, refreshToken }, null];
}