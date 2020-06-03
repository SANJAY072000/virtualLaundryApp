// importing the required modules
const mongoose=require('mongoose'),
Schema=mongoose.Schema;


// creating the customer plan schema
const customerPlanSchema=new Schema({
    customerId:{
        type:Schema.Types.ObjectId,
        ref:'customerSchema'
    },
    planName:{
        type:String,
        default:'None'
    },
    clothPerOrder:{
        type:Number,
        default:0
    },
    totalOrders:{
        type:Number,
        default:0
    },
    ordersCount:{
        type:Number,
        default:0
    },
    isPerfumed:{
        type:Boolean,
        default:false
    },
    clothType:{
        type:String,
        default:'None'
    },
    date:{
        type:Date,
        default:Date.now
    }
});




// exporting the schema
module.exports=mongoose.model('customerPlanSchema',customerPlanSchema);


