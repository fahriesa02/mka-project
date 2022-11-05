import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const env = dotenv.config().parsed;

const jwtAuth = () => {
    return async (req,res,next) => {
        try {
            if(!req.headers.authorization) throw {
                code: 401,
                message: 'UNAUTHORIZED_ACCESS'
            }
            const token = req.headers.authorization.split(' ')[1];
            // console.log(token);
            const verify = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
            // console.log(verify);
            req.jwt = verify;

            next();
        } catch(error) {
            if(error.message == 'jwt expired') {
                error.message = 'ACCESS_TOKEN_EXPIRED';
            } else if(error.message == 'invalid signature' || error.message == 'jwt malformed' || error.message == 'jwt must be provided' || error.message == 'invalid token') {
                error.message = 'INVALID_ACCESS_TOKEN'
            }

            return res.status(error.code || 401).json({
                status: false,
                message: error.message
            });
        }
    }
}

export default jwtAuth;