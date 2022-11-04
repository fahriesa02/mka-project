import Users from "../models/Users.js";

const emailExist = async (email) => {
    const user = await Users.findOne({
        email: email
    });
    if(user) {
        return true
    } else {
        return false
    }
}

export default emailExist;