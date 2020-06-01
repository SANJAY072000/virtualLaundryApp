// importing the required modules
const mongoose=require('mongoose'),
Schema=mongoose.Schema;


// creating the customer profile schema
const customerProfileSchema=new Schema({
    customerId:{
        type:Schema.Types.ObjectId,
        ref:'customerSchema'
    },
    customerImage:{
        type:String,
        required:true
    },
    customerPlan:{
        type:String,
        default:'None'
    },
    date:{
        type:Date,
        default:Date.now
    }
});


// exporting the schema
module.exports=mongoose.model('customerProfileSchema',customerProfileSchema);










