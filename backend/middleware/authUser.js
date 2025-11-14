import jwt from 'jsonwebtoken'

const authUser = async(req,res,next)=>{
try {
    
    const { token } = req.headers
    

    if(!token){
        return res.json({success:false,message:"Not authorised login again"})
    }
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
    req.userId = decodedToken.id

    next()
} catch (error) {
    console.log(error.message)
    res.json({message:error.message})
}
}

export default authUser