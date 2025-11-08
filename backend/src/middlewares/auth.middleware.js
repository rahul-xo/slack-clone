export const protectRoute=(req,res,next)=>{
    if(!req.auth().isAuthenticated || !req.auth().userId){
        return res.status(401).json({message:"Unauthorized"});
    }
    next();
}