const shortid=require("shortid");
const URL=require("../models/url");

async function handleGenerateShortURL(req,res){
    const body=req.body;
    console.log("body.url is :",body.url)
    if(!body.url)
        res.status(400).json({error:"url is required"});
    const shortID=shortid();
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[],
        createdBy: req.user._id,
    })
    res.render("home",{id:shortID});
}

async function handleRedirect(req,res){
    const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  console.log("entry =",entry);
  res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({totalClicked:result.visitHistory.length, analytics:result.visitHistory});
}

module.exports={
    handleGenerateShortURL,
    handleRedirect,
    handleGetAnalytics,
}