const User = require('../models/user.model');


const uploadProfilePic = async( req,res) => {
    try {
        console.log("Request body", req.body);
         const userId = req.user.id ; 
         console.log("user",req.user);
         const imagePath  = req.file.path ; 
         console.log("Image path", imagePath);
         const user = await User.findByIdAndUpdate(userId,{
            profilePic : imagePath },
            {new : true}
         );
         console.log("User", user);

         res.status(200).json({
            message : "Profile picture uploaded successfully",
            data: user 
         })
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

module.exports = uploadProfilePic ;