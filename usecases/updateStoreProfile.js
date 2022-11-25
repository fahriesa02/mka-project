import Stores from "../models/Stores.js";

export default async (params) => {
  const updateProfile = params.body;
  const storeId = params.jwt.storeId;

  const oldStoreProfile = await Stores.findOne({
    where: {
      id: storeId,
    },
  });

  const storeProfile = await Stores.update(updateProfile, {
    where: {
      id: storeId,
    },
  });

  if(!storeProfile) return [null, 'STORE_PROFILE_NOT_FOUND'];

  const updateStoreProfile = await Stores.findOne({
    where: {
      id: storeId,
    },
  });

  if(!updateStoreProfile) return [null, 'UPDATE_STORE_PROFILE'];

  return [{
    previousStoreProfile: oldStoreProfile,
    updatedStoreProfile: updateStoreProfile,
  }, null];
};