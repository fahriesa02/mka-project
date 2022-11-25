const WHITELIST_ATTRIBUTES = [
  'id',
  'email',
  'createdAt',
  'updatedAt'
];

export default (user) => {
  const result = {};
  const data = user.dataValues;

  for(let key in data) {
    if(WHITELIST_ATTRIBUTES.includes(key)) {
      result[key] = data[key];
    }
  }
  return result;
};