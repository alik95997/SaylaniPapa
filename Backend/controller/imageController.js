import {cloudinaryUploader} from "../config/cloudinary.js";
import express from "express"
export const uploadImageController = async (req, res)=>{
  try{
    console.log(req.files[0].path);
    const fileBuffer = req.file.buffer;
    const originalName = req.file.originalname;
    
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

