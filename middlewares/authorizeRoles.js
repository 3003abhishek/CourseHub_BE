const authorizeRoles = (...roles) => {
    return (req,res,next) =>{
        console.log(roles);
        if(!req.user){
            return res.status(401).json({message: "Unauthorized"});
        }
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message: "Forbidden"});
        }
        next();
    }
}

module.exports = authorizeRoles;