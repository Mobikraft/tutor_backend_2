// app create
const express=require("express");
const app=express();

// FIND PORT
require("dotenv").config();
const PORT=process.env.PORT||3000;
const cookieParser = require("cookie-parser");
const {cloudinaryConnect}=require("./config/cloudinary");
const fileUpload = require("express-fileupload");

// add middleware
app.use(express.json());
app.use(cookieParser());

app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );
  
// cloudinary connection
cloudinaryConnect();

// db connect
const db=require("./config/database");
db.connect();





// api route mount karna
const StudentRoute=require("./routes/StudentRoute");
app.use("/api",StudentRoute)

// activate server
app.get("/",(req,res)=>{
    res.send(" STUDENT API" )
})

app.listen(PORT,()=>{
    console.log(`API is running to ${PORT}`)
})