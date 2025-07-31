import {cloudinaryUploader} from "../config/cloudinary.js";
import fs from "fs";

export const uploadImageController = async (req,res)=>{
  try{
    console.log(req.files[0].path);
    const filepath = req.files[0].path;
    const imageRes = await cloudinaryUploader.upload(filepath);
    fs.unlink(filepath,(err,res)=>{
      
    })
    res.json({
      message:"Image is uploaded successfully",
      url: imageRes.secure_url,
      status:true;
    })
  }
  catch(error){
    res.json({
      message:error.message,
      status:false;
    })
  }
}
