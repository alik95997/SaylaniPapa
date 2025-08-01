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
  const data = await RestaurantModel.find({createdBy:userId, isDeleted:false});
  res.json({
    message "Restaurant fetched successfully!",
    status: true,
    data: data
  })
}
catch(error){
  res.json({
    message: error.message || "something went wrong",
    status: false
  })
}
}

export const deleteVendorRes = async (req, res)=>{
  const params = req.params;
  const updatedObj = {
    isDeleted: true
  }
  await RestaurantModel.findByIdAndUpdate(params.id, updatedObj);
  res.status(200).json({
    message: "Deleted Successfully",
    status: true
  })
}

export const updateVendorRestaurant = async (req, res) => {

try{
  const body = req.body;
  const {id} = req.params;
  const data = await RestaurantModel.findByIdAndUpdate(id, body, {new : true });
  res.status(200).json({
    message: "Updated successfully",
    status: true,
    data: data
  })    
}
  catch(error){
    res.status(400).json(
      message: error.message || "Something went wrong",
      status: false
    )
  }                            
}

export const vendorRestaurantStatus = async (req, res) =>{
 try{
   const body = req.body;
   const { id } = req.params;
   const restaurantData = await RestaurantModel.findById(id);
   if (!restaurantData.isApproved){
     return res.status(400).json(
       message: "Your Restaurant is not approved, please wait for admin approval",
       status: false
     )
   }
   const updatedObj = {
     isOpen : body.isOpen
   }
   await RestaurantModel.findByIdAndUpdate(id, updatedObj, {new: true});
   return res.status(200).json({
     message: "Restaurant status is updated",
     status: true
   })
 }
  catch(error){
    res.status(400).json(
      message: error.message || "Something went wrong",
      status: false
    )
  }
}
