import { cloudinaryUploader } from "../config/cloudinary.js";
import express from "express";

export const uploadImageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
        status: false
      });
    }

    // Convert buffer to base64 Data URI
    const fileBuffer = req.file.buffer;
    const mimeType = req.file.mimetype;
    const base64Data = `data:${mimeType};base64,${fileBuffer.toString("base64")}`;

    // Upload to Cloudinary
    const imageRes = await cloudinaryUploader(base64Data);

    res.json({
      message: "Image uploaded successfully",
      url: imageRes.secure_url,
      public_id: imageRes.public_id,
      status: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
      status: false
    });
  }
};
