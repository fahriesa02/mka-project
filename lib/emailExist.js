import Users from "../models/Users.js";

const emailExist = (params) => {
  const user = Users.findOne({
    where: {
      email: params
    }
  });
  console.log(user);

  if (user) return true;

  return false;
}

export default emailExist;