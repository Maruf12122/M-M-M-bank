const express = require("express");
const app = express();
require('dotenv').config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const path = require("path");

// _______mongoose_________


const user = require("./model/user");
const post = require("./model/post")
const { log } = require("console");
const { fstat } = require("fs");
const port = process.env.PORT || 3000
// _____________vareval______________



const privat_key = process.env.Privet_key
const loginnumber = 0











app.set("view engine", "ejs");
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/",(req,res)=>{
    res.render("home")
})


app.get("/dashboard",islogin,async(req,res)=>{
    const userdata = await user.findOne({email:req.user.email}).populate("posts");
    res.render("index",{userdata})
});

app.post("/post/create",islogin,async (req,res)=>{
    const userfind = await user.findOne({email:req.user.email})
    const{number,amount,tnx,name} = req.body
    const postdt = await post.create({
        name,
        number,
        taka:userfind.taka,
        tnx,
        amount,
        sp:"pending",
        fp:0,
        userid:req.user.userid
    });
    userfind.posts.push(postdt._id);
    await userfind.save()
    res.redirect("/dashboard")
})

app.get("/login",(req,res)=>{
    res.render("login")
})
app.post("/login/create",async(req,res)=>{
    const {email,password} = req.body;
    const userlogin = await user.findOne({email})
    if(userlogin){
        bcrypt.compare(password,userlogin.password,(err,result)=>{
            if(result){
                const userjwt = jwt.sign({email,userid:userlogin._id},privat_key)
                res.cookie("userdit",userjwt);
                res.redirect("/dashboard")
            }
        })
    }

})
app.post("/sing-up/create", async (req,res)=>{
    const {email,password,number,username} = req.body
    const userfind = await user.findOne({email})
    if(!userfind){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt, async (err,hash)=>{
                const useru = await user.create({
                    email,
                    password: hash,
                    username,
                    number
                })
                const userjwt = jwt.sign({email:email,userid:useru._id},process.env.Privet_key)
                res.cookie("userdit",userjwt);
                res.redirect("/dashboard")
            })
        })
    }
    else{
        res.send("sorry")
    }
    
})
app.get("/find",async(req,res)=>{
    const userff = await post.find({fp:0})
    res.render("findupdate",{userff})
})
app.post("/find/find", async (req,res)=>{
    const fastfind = await user.findOne({_id:req.body.findname})
    const taka_add = fastfind.taka + Number(req.body.amount)


    const userdatafind = await user.findOneAndUpdate({_id:req.body.findname},{taka:taka_add})
    const postdatafind = await post.findOneAndUpdate({_id:req.body.postid},{sp:"successful"})
    res.send(userdatafind)
})


app.post("/send/send",islogin,async(req,res)=>{
    const{email,password,amount} = req.body
    const usersend = await user.findOne({email:req.user.email})
    const sendtaka = await user.findOne({email:req.body.email})
    bcrypt.compare(password,usersend.password,async(err,result)=>{
        if(result){
            if(amount <= usersend.taka){
                const yourtaka = usersend.taka - amount
                await user.findOneAndUpdate({email:req.user.email},{taka:yourtaka})
                // _______friend taka_________
                const num = Number(amount);
                const st = sendtaka.taka;
                const ftaka = st+num ;
                await user.findOneAndUpdate({email},{taka:ftaka})
                console.log(ftaka);
                res.redirect("/dashboard")
            }
            else{
                console.log("sorry");
            }
        }
    })
})





app.get("/logout",(req,res)=>{
    res.cookie("userdit","");
    res.redirect("/login")
})









// _________midel________


function islogin (req,res,next){
    if(req.cookies.userdit === ""){
        res.redirect("/login");
        next();
    }
    else{
        const usersend = jwt.verify(req.cookies.userdit,privat_key)
        req.user = usersend
        next()
    }
}



app.listen(port)