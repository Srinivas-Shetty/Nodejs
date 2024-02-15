const { getalluser ,adduser,updateuser,deleteuser,loginvalidate,tokenget,changepassword,forgotpassword} = require("./employee.service")


module.exports={
    getallusers:(req,res)=>{
        getalluser(req.body,(err,data)=>{
             if(err)
             {
                return res.status(500).json({
                    failed:1,
                    error:err
                })
             }  
             return res.status(201).json({
                success:1,
                data:data
            })  
        })
    },
    insertusers:(req,res)=>{

if(!req.body.name)  return res.status(500).json({
                    failed:1,
                    error:"Name is required"
                })
        
        adduser(req.body,(err,data)=>{
             if(err)
             {
                return res.status(500).json({
                    failed:1,
                    error:err
                })
             }  
             return res.status(201).json({
                success:1,
                data:data
            })  
        })
    },
    updateusers:(req,res)=>{

if(!req.body.id)  return res.status(500).json({
                    failed:1,
                    error:"id is required"
                })
        
        updateuser(req.body,(err,data)=>{
             if(err)
             {
                return res.status(500).json({
                    failed:1,
                    error:err
                })
             }  
             return res.status(201).json({
                success:1,
                data:data
            })  
        })
    },
  deleteusers:(req,res)=>{

if(!req.body.id)  return res.status(500).json({
                    failed:1,
                    error:"id is required"
                })
        
        deleteuser(req.body,(err,data)=>{
             if(err)
             {
                return res.status(500).json({
                    failed:1,
                    error:err
                })
             }  
             return res.status(201).json({
                success:1,
                data:data
            })  
        })
    },
    loginvalidates:(req,res,next)=>{

                let info = {}
        loginvalidate(req.body,(err,data)=>{
                     if(err)
                     {
                        return res.status(500).json({
                            failed:1,
                            error:err
                        })
                     }
             

                     info = data[0]; // Update info inside callback
                     if (info) {
                         req.userInfo = info;
                         next();
                     }
                })
                
            },
    tokengets:(req,res)=>{

        console.log('sssss',req.username);
                tokenget(req.username,(err,data)=>{
                     if(err)
                     {
                        return res.status(500).json({
                            failed:1,
                            error:err
                        })
                     }
                     return res.status(200).json({
                        success:1,
                        data:data
                    })
            
                })
                
    },
    changepasswords:(req,res)=>{

        if(!req.body.email)  
        return res.status(500).json({
                            failed:1,
                            error:"email is required"
                        })
                
                        changepassword(req.body,(err,data)=>{
                     if(err)
                     {
                        return res.status(500).json({
                            failed:1,
                            error:err
                        })
                     }  
                     if(data){
                        return res.status(201).json({
                            success:1,
                            msg:"password updated success"
                        }) 
                     }
                     else{
                        return res.status(501).json({
                            fail:1,
                            msg:"old and new passwords are same"
                            
                        }) 
                     }
                   
                     
                    
                })
            },
    forgotpasswords:(req,res)=>{
        forgotpassword(req.body,(err,data)=>{
            if(err){
                        return res.status(500).json({
                            failed:1,
                            error:err
                        })
                }  

                     return res.status(200).json({
                        success:1,
                        msg:"Updated new password"
                    })
                     

        })
    }
    
}