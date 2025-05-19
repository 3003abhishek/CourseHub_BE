const jwt = require("jsonwebtoken")
const authMiddleware = (req, res, next) => {
    const token  = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Decoded user", decoded);
        next();
    } catch (err) {
        return res.status(403).json({ message: "Internal server error" });
    }
}
 
module.exports = authMiddleware;