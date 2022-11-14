import Users from "../models/Users.js";

const emailExist = async (req) => {
    const user = await Users.findOne({
        where: {
            email: req
        }
    });
    console.log(user);
    if(user) {
        return true
    } else {
        return false
    }
}

export default emailExist;