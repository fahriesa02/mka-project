import User from '../models/Users.js';

// emailExist async function untuk cek email sudah ada di db
const emailExist = async (email) => {
    const user = await User.findOne({
        email: email
    });
    if(user) {
        return true
    } else {
        return false
    }
}

// export emailExist module
export default emailExist;