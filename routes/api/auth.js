// importing the required modules
const express=require('express'),
router=express.Router(),
passport=require('passport'),
mongoose=require('mongoose'),
nodemailer=require('nodemailer'),
bcrypt=require('bcryptjs'),
jsonwt=require('jsonwebtoken');


// importing the required schema
const Customer=require('../../models/customers/Customer'),
CustomerProfile=require('../../models/customers/CustomerProfile');


// importing the secret key
const key=require('../../setup/config');


/*
@type - POST
@route - /api/auth/customer/register
@description - A route to register the customers
@access - PUBLIC
*/
router.post('/customer/register',(req,res)=>{
const customerEmail=req.body.customerEmail.toUpperCase(),
customerPassword=req.body.customerPassword.toUpperCase(),
customerName=req.body.customerName.toUpperCase();
Customer.findOne({customerEmail})
.then(customer=>{
if(customer)
return res.status(200).json({'customerAlreadyRegistered':'Customer is already registered'});
const newCustomer=new Customer({customerName,customerEmail,customerPassword});
bcrypt.genSalt(10,(err,salt)=>{
bcrypt.hash(newCustomer.customerPassword,salt,(err,hash)=>{
if(err)throw err;
newCustomer.customerPassword=hash;
newCustomer.save()
.then(customer=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'devcaffe4@gmail.com',
            pass: '4developersatcaffe'
        }
        });
        var mailOptions = {};
        mailOptions.from='sanjaysinghbisht751@gmail.com';
        mailOptions.to=customer.customerEmail;
        mailOptions.subject='Thank You for registering to Cleanly';
        mailOptions.text=`Welcome to Cleanly! Your credentials are : email - ${customer.customerEmail}
        and password - ${req.body.customerPassword}`;
        transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
    new CustomerProfile({customerId:customer._id}).save()
    .then(customerProfile=>res.status(200).json(customer))
    .catch(err=>console.log(err));
})
.catch(err=>console.log(err));
});
});
})
.catch(err=>console.log(err));
});


/*
@type - POST
@route - /api/auth/customer/login
@description - A route to login the customers
@access - PUBLIC
*/
router.post('/customer/login',(req,res)=>{
const customerEmail=req.body.customerEmail.toUpperCase(),
customerPassword=req.body.customerPassword.toUpperCase();
Customer.findOne({customerEmail})
.then(customer=>{
if(!customer)return res.status(200).json({'customerNotRegistered':'Customer is not registered'});
bcrypt.compare(customerPassword,customer.customerPassword)
.then(isCorrect=>{
    if(isCorrect){
        const payload={
            id:customer._id,
            customerName:customer.customerName,
            customerEmail:customer.customerEmail,
            customerPassword:customer.customerPassword
        };
        jsonwt.sign(payload,key.secret,{expiresIn:3600},(err,token)=>{
            if(err)throw err;
            return res.status(200).json({
                success:true,
                token:`Bearer ${token}`
            });
        });
    }
    else return res.status(200).json({'passwordIncorrect':'Password is incorrect'});
})
.catch(err=>console.log(err));
})
.catch(err=>console.log(err));
});


/*
@type - GET
@route - /api/auth/customer/test
@description - A route to test login of the customers
@access - PRIVATE
*/
router.get('/customer/test',passport.authenticate('jwt',{session:false}),(req,res)=>{
Customer.findOne({_id:req.user._id})
.then(customer=>res.status(200).json(customer))
.catch(err=>console.log(err));
});







// exporting the routes
module.exports=router;
