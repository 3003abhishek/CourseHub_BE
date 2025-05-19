const multer = require('multer');

const storage = multer.memoryStorage() ; 

const fileFilter = (req,file,cb) => {
    if(file.mimetype.startsWith('image/')|| file.mimetype.startsWith('video/')){
        cb(null,true);
    }  else{
        cb(new Error('Please upload an image or video'),false);
    }
}

const upload = multer({storage,fileFilter});

module.exports = upload ; 