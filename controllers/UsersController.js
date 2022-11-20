import User from "../models/Users.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import emailExist from "../lib/emailExist.js";
import nodemailer from 'nodemailer';
import smtptransport from 'nodemailer-smtp-transport';

import userRegisterUseCase from '../usecases/userRegister.js';
import userLoginUseCase from "../usecases/userLogin.js";

import userSerializer from '../serializer/user.js';

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
      console.log(error);
      return next({
        code: 'INTERNAL_SERVER_ERROR',
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

  async forgetPassword(req, res) {
    let email_user = req.body.email;
    let email_user_pass = req.body.userPassword;
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