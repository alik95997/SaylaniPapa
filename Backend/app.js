import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/auth.js";
import restaurantRouter from "./routes/restaurant.js";
import { dbConnection } from "./config/db.js";
import { cloudinaryConfig } from "./config/cloudinary.js";
import uploadImage from "./routes/uploadImage.js";
import adminRoute from "./routes/admin.js";
dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dbConnection();

app.use("/api/auth", authRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/image", uploadImage);
app.use("/api/admin", adminRoute);

app.get("/", (request, response) => {
    response.send("Server Up")
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
