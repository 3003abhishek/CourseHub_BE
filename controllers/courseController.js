const Course = require('../models/course.model');

const uploadToCloudinary = require('../utils/cloudinary');

const createCourse = async (req, res) => {
    try{
        const {title ,description,duration ,price} = req.body ; 
        if(!req.file){
            return res.status(400).json({message : "Please upload a thumbnail"});
        }

        const thumbnailUpload = await uploadToCloudinary(req.file.buffer, 'course_thumbnails', 'image');
        const course = await Course.create({
            title,
            description,
            duration,
            price,
            thumbnail : thumbnailUpload.secure_url,
            instructor : req.user._id,
        })

        res.status(201).json({
            message : "Course created successfully",
            course : {
                id : course._id,
                title : course.title,
                description : course.description,
                duration : course.duration,
                price : course.price,
                thumbnail : course.thumbnail,
                instructor : course.instructor,
            }
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {createCourse};