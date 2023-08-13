const express=require("express")
const router=express.Router()
 const {auth}=require("../middlewares/auth")
// ROUTES FOR LOGIN AND REGISTER

const {register,login}=require("../controllers/authStudent")

router.post('/register',register)
router.post('/login',login);



// ROUTES FOR PRofile
const {updateProfile,updateDisplayPicture,updateIdProof}=require("../controllers/Profile")


router.put("/updateProfile",auth,updateProfile);
router.put("/updateDisplayPicture",auth,updateDisplayPicture);
router.put("/updateIdProof",auth,updateIdProof);
module.exports=router