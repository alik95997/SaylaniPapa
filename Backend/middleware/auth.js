import jwt from "jsonwebtoken";
import UserModel from "../schema/User.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log("token", token);
        const isVerify = await jwt.verify(token, process.env.jwtPrivateKey);
        console.log("isVerify", isVerify)

        if (isVerify?.id) {
            req.user = isVerify;
            next()
        }
        else {
            res.json({
                message: "Unauthorized User"
            })
        }
    } catch (error) {
        res.json({
            message: "Unauthorization user"
        })
    }
}

export const adminauthMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log("token", token);
        const isVerify = await jwt.verify(token, process.env.jwtPrivateKey);
        if (isVerify?.id) {
            const user = await UserModel.findById(isVerify.id);
            console.log("user", user)
            if (isVerify?.id !== "admin") {
                return res.json({
                    message: "Only Admin can access this API",
                    status: false
                })
            }
            req.user = isVerify
            next()
        }
        else {
            res.json({
                message: "Unauthorized User",
                status: false
            })
        }
    } catch (error) {
        res.json({
            message: "Unauthorized User",
            status: false
        })
    }
}