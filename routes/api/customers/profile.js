// importing the required modules
const express=require('express'),
router=express.Router(),
passport=require('passport'),
mongoose=require('mongoose');


// importing the required schema
const CustomerProfile=require('../../../models/customers/CustomerProfile');


/*
@type - GET
@route - /api/customers/profile/getProfile
@description - A route to get the profile of logged in customer
@access - PRIVATE
*/
router.get('/getProfile',passport.authenticate('jwt',{session:false}),(req,res)=>{
CustomerProfile.findOne({customerId:req.user._id})
.populate('customerId',['customerName','customerEmail'])
.then(customerProfile=>{
if(!customerProfile)return res.status(200)
.json({'customerProfileNotFound':'Customer profile is not found'});
return res.status(200).json(customerProfile);
})
.catch(err=>console.log(err));
});


/*
@type - POST
@route - /api/customers/profile/createProfile
@description - A route to create the profile of logged in customer
@access - PRIVATE
*/
router.post('/createProfile',passport.authenticate('jwt',{session:false}),(req,res)=>{
const {customerImage,customerPlan}=req.body;
const newCustomerProfile=new CustomerProfile({customerImage,customerPlan});
newCustomerProfile.customerId=req.user._id;
newCustomerProfile.save()
.then(customerProfile=>res.status(200).json(customerProfile))
.catch(err=>console.log(err));
});








// exporting the routes
module.exports=router;


