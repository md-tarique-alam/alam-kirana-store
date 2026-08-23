const jwt=require("jsonwebtoken")

exports.authMiddleware=async(req,res,next)=>{
    try{
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({
            message: "Authentication token is missing"
        })
    }
    const decoded=jwt.verify(token, process.env.JWT_SECRET)
    req.user=decoded
    next()
    }   
    catch(error){
        res.status(401).json({
            message: "unauthorized"
        })
    }

}

exports.adminMiddleware=async(req,res,next)=>{
    try{
       if(req.user.role!=="admin"){
       return res.status(403).json({
        message: "you don't have an access"
       })
       }
     next()
    }
    catch(error){
        return res.status(401).json({
            message: "unauthorized"
        })
    }
}