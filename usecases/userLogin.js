import generateAccessToken from "../libraries/generateAccessToken.js";
import generateRefreshToken from "../libraries/generateRefreshToken.js";
import StoreUsers from "../models/StoreUsers.js";
import Users from "../models/Users.js";
import bcrypt from "bcrypt";

export default async (params) => {
  const user = await Users.findOne({
    where: {
      email: params.email,
    },
  });

  if(!user) return [null, 'USER_NOT_FOUND'];

  const storeUser = await StoreUsers.findOne({
    where: {
      storeId: params.storeId,
      userId: user.id,
    },
  });

  const storeUserId = storeUser.dataValues.id;
  const storeUserRole = storeUser.dataValues.role;
  const storeId = storeUser.dataValues.storeId;

  if(!storeUser) return [null, 'USER_UNAUTHORIZED_ACCESS'];

  const isPasswordValid = bcrypt.compareSync(params.password, user.password);
  if(!isPasswordValid) return [null, 'INVALID_USERNAME_OR_PASSWORD'];

  const payload = { id: storeUserId, role: storeUserRole, storeId: storeId };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return [{ accessToken, refreshToken }, null];
}