const Profile=require("../model/Profile");
const Student=require("../model/StudentSchema");
const { uploadToCloudinary } = require("../utils/uploadToCloudinary")

exports.updateProfile= async(req,res)=>{
    try{
    //    get data
      const {gender,tenthBoard,twenthBoard,diploma,graduation,postGraduation,AnyTeachingExperiance,
        MediumOfTeaching,ClassYouCanTeach,SubjectCombination
    }=req.body;
    //   get student id
    const id=req.user.id;
   
    // Find the profile by student id
		const studentDetails = await Student.findById(id);
		const profile = await Profile.findById(studentDetails.additionalDetails);

    // update profile
   
    profile.gender=gender;
    profile.tenthBoard=tenthBoard;
    profile.twenthBoard=twenthBoard;
    profile.diploma=diploma;
    profile.graduation=graduation;
    profile.postGraduation=postGraduation;
    profile.AnyTeachingExperiance=AnyTeachingExperiance;
    profile.ClassYouCanTeach=ClassYouCanTeach;
    profile.MediumOfTeaching=MediumOfTeaching;
    profile.SubjectCombination=SubjectCombination;
  
    

    // save details using save method
    await profile.save();
    return res.status(200).json({
        success:true,
        message:"Profile updated successfullly",
        profile
    })

    }
    catch(err){
     return res.status(500).json({
        success:false,
        error:err.message
     })
    }
}

// update display picture or profile photo

exports.updateDisplayPicture=async(req,res)=>{
    try{
    // fetch files of image
    const displayPicture=req.files.displayPicture;
    // fetch user id
    const studentId=req.user.id;
    // upload to cloudinary
    const image =await  uploadToCloudinary(displayPicture,process.env.FOLDER_NAME,1000,1000);
    console.log(image);
    // update image of user
    const updatedProfile= await Student.findByIdAndUpdate({_id:studentId},{image:image.secure_url},{new:true});
    res.send({
        success:true,
        message:"Image updated successfully",
        data:updatedProfile
    })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
}

exports.updateIdProof=async(req,res)=>{
    try{
    // fetch files of image
    const idProof=req.files.idProof;
    // fetch user id
    const profileId=req.user.id;
    // upload to cloudinary
    const uploadDetails =await  uploadToCloudinary(idProof,process.env.FOLDER_NAME);
    console.log(uploadDetails);
    // update image of user
    const updatedIdProof= await Profile.findByIdAndUpdate({_id:profileId},{idProofUrl:uploadDetails.secure_url},{new:true});
    res.send({
        success:true,
        message:"IdProof updated successfully",
        data:updatedIdProof
    })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
}