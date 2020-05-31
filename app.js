// importing the required modules
const express=require('express'),
mongoose=require('mongoose'),
bodyparser=require('body-parser'),
passport=require('passport'),
path=require('path'),
cors=require('cors');


// creating the server
const app=express();


// configuring the port
const port=process.env.PORT||3000;


// importing the mongodb connection Url
const dbstr=require('./setup/config').mongoUrl;


// importing the routes
const auth=require('./routes/api/auth');


// configuring body-parser middleware
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());


// configuring passport middleware
app.use(passport.initialize());


// configuring cors middleware
app.use(cors());


// configuring the passport strategy
require('./strategies/jsonwtStrategy')(passport);


// connecting the mongodb
mongoose.connect(dbstr,{useNewUrlParser:true,useUnifiedTopology:true})
        .then(res=>console.log('Mongodb connected successfully'))
        .catch(err=>console.log(err));


// configuring the routes
app.use('/api/auth',auth);


// configuring the build dynamically
if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    });

}


// configuring the server
app.listen(port,()=>console.log(`Server is running at port ${port}`));



