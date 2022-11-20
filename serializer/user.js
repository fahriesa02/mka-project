const WHITELIST_ATTRIBUTES = [
  'id',
  'email',
  'createdAt',
  'updatedAt'
];

export default (user) => {
  console.log(user);
  const result = {};
  const data = user.dataValues;

  for(let key in data) {
    console.log(key);
    if(WHITELIST_ATTRIBUTES.includes(key)) {
      result[key] = data[key];
    }
  }
  return result;
}