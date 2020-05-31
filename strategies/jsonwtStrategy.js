// importing the required modules
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;


// importing the required schema
const Customer=require('../models/customers/Customer');


// importing the secret key
const key=require('../setup/config');


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secret;


// exporting the strategy
module.exports=passport=>{
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
    Customer.findById(jwt_payload.id)
    .then(customer=>{
        if(customer)return done(null,customer);
        else return done(null,false);
    })
    .catch(err=>console.log(err));
}));
}



