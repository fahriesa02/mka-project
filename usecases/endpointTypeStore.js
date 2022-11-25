import Stores from "../models/Stores.js";

export default async (params, next) => {
  const storeType = Stores.findOne({
    attributes: 'type',
    where: {
      id: params.jwt.storeId,
    },
  });

  const endpoint = storeType;

  return next(endpoint);
}