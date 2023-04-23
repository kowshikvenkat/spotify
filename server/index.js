const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors");
const mongoose = require("mongoose")

  
mongoose.set('strictQuery',false)
const database = module.exports =()=>{
  const connectionParams = {
    useNewUrlParser:true,
    useUnifiedTopology:true
  }
  try{
    mongoose.connect('mongodb+srv://kowshikvenkat2002:Kowshik333*@cluster0.jl79y1m.mongodb.net/spotify?retryWrites=true&w=majority',connectionParams)
    console.log("database connected successfully")
  }catch(err){
console.log(err)
console.log("couldn't connect database")
  }
}



database()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));
const RegisterSchema = new mongoose.Schema({
 name:String,
       desc:String,
       category:String,
       speaker:String,
       thumbnail:String,
       file:String,
       watchtime: Number
})
const RegisterUser = mongoose.model('podcasts',RegisterSchema)
app.post("/newpodcast",(req,res)=>{
const user={
name:req.body.name,
desc:req.body.desc,
category:req.body.category,
speaker:req.body.speaker,
thumbnail:req.body.thumbnail,
file:req.body.filedata,
watchtime:0
}
RegisterUser.create(user).then((res)=>console.log("added to pending registers"))
})
app.get("/podcasts",(req,res)=>{
RegisterUser.find({},function(err,docs){
  res.send({data:docs})
})
})
app.post("/addwatchtime",(req,res)=>{
  console.log("watchtime working")
  RegisterUser.findOneAndUpdate({_id:req.body.id},{ $inc: { watchtime: 1 } }).then((res)=>console.log("watchtime increased"))
})