const {getUser}=require("../service/auth");

function checkForAuthentication(req,res,next){
    const tokenCookie=req.cookies?.token;
    console.log("Req.user of checkForAuthentication is",req.user);
    req.user=null;

    if(!tokenCookie)  return next();
    
    const token=tokenCookie;
    const user=getUser(token);

    req.user=user;
    return next();
}

function restrictTo(roles=[])
{    return function(req,res,next){
        console.log("request.user ",req.user);
        if(!req.user) return res.redirect("login");

        if(!roles.includes(req.user.role)) return res.end("UnAuthorized");

        return next();
    };
}

module.exports={
    checkForAuthentication,
    restrictTo,
}