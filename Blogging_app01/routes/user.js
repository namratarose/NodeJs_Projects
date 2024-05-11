const {Router}=require("express");
const User=require("../models/user");

const router=Router();

router.get("/signin",(req,res)=>{
    res.render("signin");
})
router.get("/signup",(req,res)=>{
    res.render("signup");
})
router.post("/signin",async (req,res)=>{
    const {email,password}=req.body;
    try{
        const token = await User.matchPasswordAndGenerateToken(email,password);
        return res.cookie("token",token).redirect("/");
    }
    catch(error){
        return res.render("signin",{
            error:"Incorrect Email or Password",
        });
    }
    
});
router.post("/signup",async(req,res)=>{
    const { fullName ,email ,password}=req.body;
    // console.log(fullName,email,password);
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect("/");
});

router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/");
});

module.exports=router;