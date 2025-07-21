import bcrypt from "bcryptjs";
import UserModel from "../schema/User.js";
import jwt from "jsonwebtoken"

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

          const transporter = nodemailer.createTransport({
               service: "Gmail",
               host: "smtp.gmail.com",
               port: "465",
               secure: true,
               auth: {
                    user: process.env.EMAIL,
                    password: "your_app_password"
               },
               
          })
          
     } catch (error) {

     }
}
