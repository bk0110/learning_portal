const app=require('express')();
const auth=require('../middleware/auth');
app.post('/',auth,(req,res,next)=>{
res.status(200).send("course joined")})
module.exports=app;