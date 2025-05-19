const multer = require('multer'); 
const path = require('path');

const storage  = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profilePics');
} , 
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }

});

const fileFilter = (req , file , cb) => {
    if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg"){
        cb(null , true);
    }else{
        cb(new Error("please upload a valid image"), false);
    }
}

const upload = multer({storage,fileFilter});

module.exports  = upload ; 