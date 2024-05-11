const express = require("express");
const { connectMongoDB } = require("./connection");
const path=require("path");
const cookieParser=require("cookie-parser");
const {checkForAuthentication, restrictTo}=require("./middlewares/auth");

const URL = require("./models/url");

const staticRoute=require("./routes/staticRoute");
const urlRoute = require("./routes/url");
const userRoute=require("./routes/user");

const app = express();
const PORT = 8001;

//connection with mongodb
connectMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongodb is connected")
);

//Middlewares
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL","ADMIN"]), urlRoute);
app.use("/user",userRoute);
app.use("/",staticRoute);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
