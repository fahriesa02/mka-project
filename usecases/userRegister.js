import Users from "../models/Users.js";
import Stores from "../models/Stores.js";
import StoreUsers from "../models/StoreUsers.js";

export default async (params) => {
  const userParams = params.user;
  const storeParams = params.store;

  const user = await Users.create(userParams);
  if(!user) return [null, 'FAILED_TO_CREATE_USER'];

  const store = await Stores.create(storeParams);
  if(!store) return [null, 'FAILED_TO_CREATE_STORE'];

  await StoreUsers.create({
    storeId: store.id,
    userId: user.id,
  });

  return [{ user, store }, null];
}