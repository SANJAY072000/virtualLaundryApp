// importing the required modules
const express=require('express'),
router=express.Router(),
passport=require('passport'),
mongoose=require('mongoose');


// importing the required schema
const CustomerProfile=require('../../../models/customers/CustomerProfile'),
CustomerPlan=require('../../../models/customers/CustomerPlan');


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
@description - A route to create the profile of customer
@access - PRIVATE
*/
router.post('/createProfile',passport.authenticate('jwt',{session:false}),(req,res)=>{
const {customerImage}=req.body;
const newCustomerProfile=new CustomerProfile({customerImage});
newCustomerProfile.customerId=req.user._id;
newCustomerProfile.save()
.then(customerProfile=>res.status(200).json(customerProfile))
.catch(err=>console.log(err));
});


/*
@type - GET
@route - /api/customers/profile/allProfiles
@description - A route to get the profiles of all customers
@access - PUBLIC
*/
router.get('/allProfiles',(req,res)=>{
    CustomerProfile.find()
    .populate('customerId',['customerName','customerEmail'])
    .then(customerProfile=>{
        if(!customerProfile.length)
        return res.status(200).json({'noCustomer':'No customer is there'});
        return res.status(200).json(customerProfile);
    })
    .catch(err=>console.log(err));
});


/*
@type - POST
@route - /api/customers/profile/createPlan
@description - A route to create a basic or premium plan
@access - PRIVATE
*/
router.post('/createPlan',passport.authenticate('jwt',{session:false}),(req,res)=>{
let newPlan={};
newPlan.customerId=req.user._id;
if(req.body.planName.toUpperCase()==='BASIC'){
newPlan.planName=req.body.planName.toUpperCase();
newPlan.clothPerOrder=5;
newPlan.totalOrders=req.body.totalOrders;
newPlan.clothType='CLOTHES';
}
else{
newPlan.planName=req.body.planName.toUpperCase();
newPlan.clothPerOrder=10;
newPlan.totalOrders=req.body.totalOrders;
newPlan.clothType='ALL';
newPlan.isPerfumed=true;
}
new CustomerPlan(newPlan).save()
.then(customerPlan=>res.status(200).json(customerPlan))
.catch(err=>console.log(err));

});


/*
@type - GET
@route - /api/customers/profile/getPlan
@description - A route to get the plan of customer
@access - PRIVATE
*/
router.get('/getPlan',passport.authenticate('jwt',{session:false}),(req,res)=>{
CustomerPlan.find({customerId:req.user._id})
.then(customerPlan=>{
    if(!customerPlan.length)return res.status(200).json({'noPlanFound':'No plan is found'});
    return res.status(200).json(customerPlan)})
.catch(err=>console.log(err));
});




// exporting the routes
module.exports=router;


