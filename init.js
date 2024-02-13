const mongoose = require("mongoose");
const Chat = require("./models/chats");

main()
    .then(() => {console.log("connection sucessful")})
    .catch((err) => {console.log(err)});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
};

let allchat=[
    {
        from:"manoh",
        to:"mohan",
        msg:"to hi",
        created_at: new Date()
    },
    {
        from:"ayush",
        to:"yash",
        msg:"to hello",
        created_at: new Date()
    },
    {
        from:"man",
        to:"sachin",
        msg:"to jojo",
        created_at: new Date()
    },
        
]

Chat.insertMany(allchat);

