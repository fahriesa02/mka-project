import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import emailExist from "../lib/emailExist.js";
import nodemailer from 'nodemailer';
import smtptransport from 'nodemailer-smtp-transport';

import userRegisterUseCase from '../usecases/userRegister.js';
import userLoginUseCase from "../usecases/userLogin.js";

import userSerializer from '../serializer/user.js';
import refreshToken from "../usecases/refreshToken.js";

const env = dotenv.config().parsed;

class userController {
  async Register(req, res, next) {
    try {
      if(!req.body.companyName) return next({ code: 'COMPANY_NAME_IS_REQUIRED' });
      if(!req.body.email) return next({ code: 'EMAIL_IS_REQUIRED' });
      
      if(req.body.password.length < 6) return next({ code: 'PASSWORD_MINIMUM_6_CHARACTERS' })

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      
      const reqBody = req.body;
      let [records, errorCode] = await userRegisterUseCase({
        user: {
          email: reqBody.email,
          password: hash,
        },
        store: {
          name: reqBody.companyName,
          email: reqBody.email,
          city: reqBody.city,
          address: reqBody.address,
          province: reqBody.province,
          postCode: reqBody.postCode,
          phoneNumber: reqBody.phoneNumber,
          industry: reqBody.industry,
          type: reqBody.type,
        },
      });
      if(errorCode) return next({ code: errorCode });
      
      const userResponse = userSerializer(records.user);

      return res.status(201).json({
        message: 'USER_REGISTERED_SUCCESS',
        data: {
          user: userResponse,
          store: records.store,
        },
      });
    } catch(error) {
      return next({
        code: 'USER_REGISTER_FAILURE',
        details: error.message
      });
    }
  }

  async Login(req, res, next) {
    try {
      if(!req.body.email) throw {
        code: 400,
        message: 'EMAIL_IS_REQUIRED'
      }

      if(!req.body.password) throw {
        code: 400,
        message: 'PASSWORD_IS_REQUIRED'
      }

      let [authPayload, errorMsg] = await userLoginUseCase(req.body);
      if(errorMsg) return next({
        code: errorMsg
      });
      
      return res.status(200).json({
        status: true,
        message: 'USER_LOGIN_SUCCESS',
        ...authPayload,
      });
    } catch(error) {
      return next({
        code: 'USER_UNAUTHORIZED_ACCESS',
        message: error.message
      });
    }
  }

  async refreshToken(req, res, next) {
    try {
      if(!req.body.refreshToken) throw {
        code: 400,
        message: 'REFRESH_TOKEN_IS_REQUIRED'
      }

      const reqBody = req.body.refreshToken
      // const verify = jwt.verify(req.body.refreshToken, env.REFRESH_TOKEN);

      // const accessToken = generateAccessToken({id: verify.id});
      // const refreshToken = generateRefreshToken({id: verify.id});
      let [token, errorMsg] = await refreshToken(reqBody);
      if(errorMsg) return next({
        code: errorMsg,
      });

      return res.status(200).json({
        status: true,
        message: 'REFRESH_TOKEN_SUCCESS',
        token
      });
    } catch(error) {
      return next({
        code: 'INVALID_JWT_TOKEN',
        message: error.message
      })
    }
  }

  async forgetPassword(req, res) {
    let email_user = req.body.email;
    let email_user_pass = env.NODEMAILER_PASSWORD;
    let email_recipient = req.body.emailRecipient;


    const transporter = nodemailer.createTransport(smtptransport({
      service: 'gmail',
      auth: {
        user: email_user,
        pass: email_user_pass
      },
      tls: {
        rejectUnauthorized: false
      }
    }));

    const mailOptions = {
      from: email_user,
      to: email_recipient,
      subject: 'Testing nodemailer transport',
      text: 'EMAIL INI MENCOBA FITUR NODEMAILER'
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if(error) {
        return res.status(400).json({
          status: false,
          message: error
        });
      } else {
        return res.status(200).json({
          status: true,
          message: 'Email sent to: ' + info
        });
      }
    })
  }
}

export default new userController();