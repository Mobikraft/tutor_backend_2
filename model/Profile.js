const mongoose=require("mongoose");

const ProfileSchema=new mongoose.Schema({
    gender:{
        type:String
     },
   tenthBoard:{
    type:String,
   },
   twenthBoard:{
    type:String,
   },
   diploma:{
    type:String,
   },
   graduation:{
    type:String,
   },
   postGraduation:{
    type:String,
   },
   AnyTeachingExperiance:{
    type:String,
   },
   idProof:{
    type:String
   },
   MediumOfTeaching:{
     type:String
   },
   ClassYouCanTeach:{
      type:String
   },
   SubjectCombination:{
    type:String
   }
   
    
})
module.exports=mongoose.model("Profile",ProfileSchema);