import Users from "../models/Users.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import emailExist from "../libraries/emailExist.js";

const env = dotenv.config().parsed;


const generateAccessToken = function(payload) {
    return jwt.sign(payload, env.ACCESS_TOKEN, { expiresIn: '15m' });
}

const generateRefreshToken = function(payload) {
    return jwt.sign(payload, env.REFRESH_TOKEN, { expiresIn: '1d' });
}

class authController {
    async Register(req, res) {
        try {
            if(!req.body.fullName) throw {
                code: 400,
                message: 'FULLNAME_IS_REQUIRED'
            }
            if(!req.body.email) throw {
                code: 400,
                message: 'EMAIL_IS_REQUIRED'
            }
            if(!req.body.password) throw {
                code: 400,
                message: 'PASSWORD_IS_REQUIRED'
            }
            if(req.body.password.length < 6) throw {
                code: 400,
                message: 'PASSWORD_MINIMUM_6_CHARACTERS'
            }


            const isEmailExist = await emailExist(req.body.email); // logika nya masih terbali??
            if(!isEmailExist) throw {
                code: 400,
                message: 'EMAIL_ALREADY_EXIST'
            }

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);

            const user = await Users.create({
                fullName: req.body.fullName,
                email: req.body.email,
                password: hash
            });

            if(!user) throw {
                code: 500,
                message: 'USER_REGISTER_FAILED'
            }

            return res.status(200).json({
                status: true,
                message: 'USER_REGISTERED_SUCCESS',
                user
            });
        } catch(error) {
            return res.status(error.code || 500).json({
                status: false,
                message: error.message
            });
        }
    }

    async Login(req, res) {
        try {
            if(!req.body.email) throw {
                code: 400,
                message: 'EMAIL_IS_REQUIRED'
            }

            if(!req.body.password) throw {
                code: 400,
                message: 'PASSWORD_IS_REQUIRED'
            }

            const user = await Users.findOne({
                where: {
                    email: req.body.email
                }
            });
            // email: req.body.email
            
            if(!user) throw {
                code: 400,
                message: 'EMAIL_NOT_FOUND'
            }

            const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
            if(!isPasswordValid) throw {
                code: 400,
                message: 'WRONG_PASSWORD'
            }

            const accessToken = await generateAccessToken({id: user._id});
            const refreshToken = await generateRefreshToken({id: user._id});

            // await user.update({
            //     refresh_token: refreshToken
            // });

            return res.status(200).json({
                status: true,
                message: 'USER_LOGIN_SUCCESS',
                accessToken,
                refreshToken
            });
        } catch(error) {
            return res.status(error.code >= 100 && error.code < 600 ? error.code : 500).json({
                status: false,
                message: error.message
            });
        }
    }

    async refreshToken(req, res) {
        try {
            if(!req.body.refreshToken) throw {
                code: 400,
                message: 'REFRESH_TOKEN_IS_REQUIRED'
            }

            const verify = jwt.verify(req.body.refreshToken, env.REFRESH_TOKEN);

            const accessToken = generateAccessToken({id: verify.id});
            const refreshToken = generateRefreshToken({id: verify.id});

            return res.status(200).json({
                status: true,
                message: 'REFRESH_TOKEN_SUCCESS',
                accessToken,
                refreshToken
            });
        } catch(error) {
            if(error.message == 'jwt expired') {
                error.message = 'REFRESH_TOKEN_EXPIRED'
            } else if(error.message == 'invalid signature' || error.message == 'jwt malformed' || error.message == 'jwt must be provided' || error.message == 'invalid token') {
                error.message = 'INVALID_REFRESH_TOKEN'
            }

            return res.status(error.code || 500).json({
                status: false,
                message: error.message
            })
        }
    }
}

export default new authController();