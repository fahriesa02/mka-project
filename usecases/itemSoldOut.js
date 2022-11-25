import Products from "../models/Products.js";
import Supplies from "../models/Supplies.js";
import { Op } from "sequelize";

export default async (params) => {
  const item = await Products.findAll({
    where: {
      storeId: params,
    },
    attributes: ['name', 'skuProduct']
  });
  const supply = await Supplies.findAll({
    where: {
      warehousesId: params,
      quantityProduct: {
        [Op.eq]: 0
      }
    },
    attributes: ['unit', 'quantityProduct']
  });

  if(!item) return [null, 'DATA_PRODUCT_IS_NOT_FOUND'];
  if(!supply) return [null, 'PRODUCT_SUPPLY_IS_NOT_FOUND'];
  return [{ item, supply }, null];
}