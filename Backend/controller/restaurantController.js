import RestaurantModel from "../schema/Restaurant.js";

export const createRestaurantController = async (req,res)=>{
try{
  const body = req.body;
  const userId = req.user.id
  const restaurantObj = {
    ...body,
    createdBy: userId
  }
  const response = await RestaurantModel.create(restaurantObj);
  res.json({
    message:"Restaurant is created successfully, wait for Admin approval.",
    status:true,
    data:response
  })
}
  catch(error){
    res.json(
      message:error.message || "Something went wrong",
      status:false,
      data:null
    )
  }
}

export const getVendorRestaurant = async (req,res)=>{
try{
  const userId = req.user.id
  console.log("userId", userId);
  const response = await RestaurantModel.find({createdBy:userId, isDeleted:false});
  res.json({
    message "Restaurant fetched successfuly!",
    status:true,
    
  })
}
catch(error){
  res.json({
    message:error.message || "something went wrong",
    status:false
  })
}
}

export const deleteVendorRes = async (req,res)=>{
  const 
}
