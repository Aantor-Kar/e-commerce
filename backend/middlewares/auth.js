import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const { token } = req.headers
    if(!token){
        return res.status(401).json({ success: false, message: 'Not Authorized! Login Again.'})
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if (!tokenDecode || typeof tokenDecode !== 'object' || !tokenDecode.id) {
            return res.status(401).json({ success: false, message: 'Invalid user token. Please login again.' })
        }
        req.body.userId = tokenDecode.id
        next()
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Invalid user token. Please login again.' })
        }
        console.log(error)
        res.status(500).json({success: false, message:error.message})
    }
}
export default authUser
