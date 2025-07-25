import bcrypt from "bcryptjs";
import UserModel from "../schema/User.js";
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer";
import { text } from "express";
import { signupEmailTemplate } from "../templates/emailTemplate.js";

export const signupController = async (request, response) => {
     try {
          const body = request.body;
          const isExist = await UserModel.findOne({ email: body.email });
          if (isExist) {
               return response.json({
                    message: "Email Address Alread Exist!",
                    status: false,
                    data: null
               })
          }
          const hashPassword = await bcrypt.hash(body.password, 10);
          const userObj = {
               body,
               password: hashPassword
          }
          await UserModel.create(userObj)
          console.log("User created");
          // Send Email
          const transporter = nodemailer.createTransport({
               service: "Gmail",
               host: "smtp.gmail.com",
               port: "465",
               secure: true,
               auth: {
                    user: process.env.EMAIL,
                    password: "process.env.APP_PASSWORD"
               },

          })
          const otp = Math.floor(100000 + Math.random() * 900000);
          const mailOption = {
               from: process.env.Email,
               to: process.env.EMAIL,
               subject: "User Sign Up ",
               html: signupEmailTemplate(userObj, otp)
          };
          await transporter.sendMail(mailOption)
          response.json({
               message: "User is signed up successfully",

          })
     } catch (error) {
          response.json({
               message: error.message || "Something went wrong"
          })
     }
}

export const loginController = async (req, res) => {
     try {
          const body = req.body;
          if (!body) {
               return res.json({
                    message: "required fields are missing.",
               })
          }
          console.log(body);
          const user = await UserModel.findOne({ email: body.email });
          console.log(user);
          if (!user) {
               return response.json({
                    message: "Invalid Email or Password",
                    status: false
               })
          }
          // jwt sign
          const PRIVATE_KEY = process.env.jwtPrivateKey;
          const token = jwt.sign({ id: user._id }, PRIVATE_KEY, {

          })
          console.log("token", token);
          res.json({
               message: "User Logged In Successfully",
               status: true,
               data: user,
               token
          }

          )
     } catch (error) {
          res.json({
               message: error.message || "Something went wrong",
               status: false
          })
     }
}