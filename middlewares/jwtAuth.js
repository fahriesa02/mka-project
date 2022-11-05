import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const env = dotenv.config().parsed;

const jwtAuth = () => {
    return  function(req,res,next) {
        try {
            if(!req.headers.authorization) {
                const token = req.headers.authorization.split(' ')[1];
                const verify = jwt.verify(token, env.ACCESS_TOKEN, function(error, data) {
                    if(error) {
                        if(error.name == 'TokenExpiredError') {
                            throw 'TOKEN_EXPIRED'
                        } else {
                            throw 'TOKEN_IS_NOT_VALID'
                        }
                    } else {
                        req.jwt = verify;
                        next();
                    }
                });
            } else {
                throw 'TOKEN_REQUIRED'
            }

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