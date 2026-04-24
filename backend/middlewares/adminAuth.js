import jwt from 'jsonwebtoken';
const adminAuth = async (req, res, next) => {
    try {
        const {token} = req.headers;
        if(!token){
            return res.status(401).json({success: false, message: "Unauthorized Access! Login again..."})
        }
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.status(401).json({success: false, message: "Unauthorized Access! Login again..."})
        }
        next()
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({success: false, message: "Invalid admin token. Login again..."})
        }
        console.log(error);
        res.status(500).json({success: false, message: error.message})
    }
}
export default adminAuth;
