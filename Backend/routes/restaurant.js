import express from "express";
import { createRestaurantController, deleteVendorRes, dropdownRestaurant, getVendorRestaurant, updateVendorRestaurant, vendorRestaurantStatus } from "../controller/restaurantController.js";
import { authMiddleware } from "../middleware/auth.js";

const restaurantRouter = express.Router();

//Restaurant

//create Restaurant
restaurantRouter.post("/create-restaurant", authMiddleware, createRestaurantController);

//getVendorRestaurant
restaurantRouter.get("/vendor-restaurant", authMiddleware, getVendorRestaurant);

//soft delete
restaurantRouter.delete("/vendor-restaurant/:id", authMiddleware, deleteVendorRes);

//edit restaurant
restaurantRouter.put("/vendor-restaurant/:id", authMiddleware, updateVendorRestaurant);

restaurantRouter.patch("/vendor-restaurant-status", authMiddleware, vendorRestaurantStatus);

restaurantRouter.get("/dropdown-restaurant", authMiddleware, dropdownRestaurant);

export default restaurantRouter