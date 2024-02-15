const jwt=require('jsonwebtoken');

// const username=data.name;
// const accessToken=jwt.sign(username,process.env.ACCESS_TOKEN_KEY)
module.exports={
    tokenGenerator:(req,res)=>{
        console.log("request",req.userInfo);
        const {id,name,city,email,passwords,userrole_id} = req.userInfo
        // return
        const token  = jwt.sign(
            {id,userrole_id},
            process.env.ACCESS_TOKEN_KEY,
            {expiresIn:'10h'}
        )
        // console.log(token);
     return res.status(200).json({
            success:1,
            token:token,
            name:name,
            email:email,
            userrole_id:userrole_id
        })  
    },

 authenticationToken:(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    const token=authHeader &&authHeader.split(' ')[1]
    if(token==null){
        return  res.sendStatus(401);
    }

    jwt.verify(token,process.env.ACCESS_TOKEN_KEY,(err,user)=>{
        if(err){
            return res.status(403).json({
                failed:1,
                error:err
            })
        }
        req.username=user

        next()
    })
}
}