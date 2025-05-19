const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type : String ,
        required : true,

    },
    description : {
        type : String ,
        required : true,
    },
    duration : {
        type : String ,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    thumbnail :{
        type : String ,
        required: true,
    },
    notes :   [String],
    videos: [String],
    instructor : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    studentsEnrolled : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
    }],
},
    {
         timestamps: true
 }

)

module.exports = mongoose.model('Course', courseSchema);