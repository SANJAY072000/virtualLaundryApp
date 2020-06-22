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
        default:'https://firebasestorage.googleapis.com/v0/b/virtuallaundry.appspot.com/o/customerImages%2Fpr.png?alt=media&token=e3ef908e-c469-4e8c-a26e-ce1d081138e4'
    },
    date:{
        type:Date,
        default:Date.now
    }
});


// exporting the schema
module.exports=mongoose.model('customerProfileSchema',customerProfileSchema);










