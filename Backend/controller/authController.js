import bcrypt from "bcryptjs";
import UserModel from "../schema/User.js";
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer";
import { text } from "express";
import { signupEmailTemplate } from "../templates/emailTemplate.js";
import OTPModel from "../schema/otp.js"

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
               to: userObj.email,
               subject: "User Sign Up ",
               html: signupEmailTemplate(userObj, otp)
          };
          const userEmail =  await transporter.sendMail(mailOption);
          await OTPModel.create({
               otp,
               email:userObj.email
          })
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
          if (!body.email || !password.password) {
               return res.status(400).json({
                    message: "required fields are missing.",
               })
          }
          console.log(body);
          const user = await UserModel.findOne({ email: body.email });
          console.log(user);
          if (!user) {
               return res.status(400).json({
                    message: "Invalid Email or Password",
                    status: false
               })
          }

          const comparePass = await bcrypt.compare(body.password, user.password);
          if (!comparePass){
               return res.status(400).json({
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
          res.status(500).json({
               message: error.message || "Internal server error",
               status: false
          })
     }
}

export const OTPVerifyController = (req,res)=>{
     try{
          const {otp, email} = req.body;
          const otpRes = await OTPModel.findOne({email ,otp, isUsed: false});
              console.log("Otp Res", otpRes);
          if(!otpRes){
               return res.json({
                    message:"OTP invalid",
                    status:false
               })
          }
          otpRes.isUsed = true;
          await otpRes.save()
          await UserModel.findOneAndUpdate({email},{isVerified:true});
          res.json({
               message:"Account verified",
               status: true
          })
     }
     catch(error){
          console.log("error", error.message)
     }
}
