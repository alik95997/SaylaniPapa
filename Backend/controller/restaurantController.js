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
