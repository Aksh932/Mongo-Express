const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats");
const methodeOverride=require("method-override");


app.set("view engin" , "ejs" );
app.set("views" , path.join(__dirname ,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodeOverride("_method"));

main()
    .then(() => {console.log("connection sucessful")})
    .catch((err) => {console.log(err)});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};


//index route
app.get("/chats" , async(req,res) => {
    let chats = await Chat.find();
    
    res.render("index.ejs" ,{ chats });
});

app.get("/" , (req,res) => {
    res.send("hello")
});

//new chat
app.get("/chats/new" ,(req,res) => {
    res.render("new.ejs");
});

//create route
app.post("/chats" ,(req,res) => {
    let {from , msg ,to} = req.body;
    let newChat = new Chat(
        {
            from:from,
            msg:msg,
            to:to,
            created_at:new Date()
        }, );
    newChat.save()
    .then((res)=>{console.log("woud")})
    .catch((err) => {console.log(err)});
    res.redirect("/chats");

});


// edit route

app.get("/chats/:id/edit" ,async(req,res) =>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});

//upadte route

app.put("/chats/:id" , async(req,res) =>{
    let {id} =req.params;
    let {msg : newMsg} =req.body;
    let updateChat =await Chat.findByIdAndUpdate(id,
         {msg :newMsg},
         {runValidators :true, new :true});

    console.log(updateChat);
    res.redirect("/chats");
})


// destroy route
app.delete("/chats/:id" , async(req,res) =>{
    let {id} = req.params;
    let deletedChat =await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})

app.listen(8080 ,() => {
    console.log("connected");
})