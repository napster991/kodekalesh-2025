import jwt from 'jsonwebtoken'

// next is a callback function 
const authAdmin = async(req,res,next)=>{
try {
    
    const {atoken} = req.headers

    if(!atoken){
        return res.json({success:false,message:"Not authorised login again"})
    }
    const decodedToken = jwt.verify(atoken,process.env.JWT_SECRET)
    
    if(decodedToken!=process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
       return res.json({message:"invalid token"})
    }
    
    next()
} catch (error) {
    res.json({message:error.message})
    console.log(error.message)
}
}

export default authAdmin