const express = require('express') ; 
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const profileRoute = require('./routes/profile.route') ;
const dashboardRoute = require('./routes/dashboard.route') ;
const authMiddelware = require('./middlewares/authMiddleware') ;
const authorise = require('./middlewares/authorizeRoles') ;
const uploadProfilePic = require('./controllers/user.controller');
const upload = require('./middlewares/upload.middleware'); 
const courseRoutes = require('./routes/courseRoutes');

const authRoute = require('./routes/auth.route') ;
const dotenv = require('dotenv');
dotenv.config();

const app = express() ; 

app.use(express.json()); 
app.use(cookieParser());

app.use("/api/auth",authRoute) ;
app.use("/api/profile",authMiddelware,profileRoute) ;
app.use("/api/dashboard",authMiddelware,authorise("admin"),dashboardRoute) ;
app.use("/api/upload",authMiddelware,upload.single("profilePic"),uploadProfilePic);
app.use("api/courses",courseRoutes);


module.exports = app ; 