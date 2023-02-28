const express=require('express');
const mongoose=require('mongoose');
const body_parser=require('body-parser');
const cookieparser=require('cookie-parser');
const cors=require('cors')
const app=express();
app.use(cors())
app.use(body_parser.urlencoded({extended:true}))
app.use(cookieparser())
app.use(body_parser.json());


const Routes=require('./routes/Routes');
app.use('/api',Routes);

const port=process.env.PORT || 7000
const DB ="mongodb+srv://nodeClassjan:BrnrXRpwEfvb35kG@cluster0.4axmojt.mongodb.net/node_login_Auth_API"
mongoose.connect(DB,({useNewUrlParser:true,useUnifiedTopology:true}))
.then(result=>{
app.listen(port,()=>{
    console.log("DB connected.....");
    console.log(`server running http://localhost:${port}`);
})
}).catch(err=>{
    console.log(err);
})