// importing the required modules
const mongoose=require('mongoose'),
Schema=mongoose.Schema;


// creating the customer schema
const customerSchema=new Schema({
    customerName:{
        type:String,
        required:true
    },
    customerEmail:{
        type:String,
        required:true
    },
    customerPassword:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});


// exporting the schema
module.exports=mongoose.model('customerSchema',customerSchema);










