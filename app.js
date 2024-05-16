const express = require("express");
const app = express();
require('dotenv').config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const path = require("path");


app.set("view engine", "ejs");
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.get("/",(req,res)=>{
    res.send("Maruf")
});


app.listen(3000)