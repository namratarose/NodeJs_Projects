const express = require("express");
const { handleGenerateShortURL, handleGetAnalytics,handleRedirect} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateShortURL);

router.get("/:shortId",handleRedirect);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
