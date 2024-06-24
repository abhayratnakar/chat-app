const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messagesRoutes")
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());


//routes send on /api/auth route on frontend
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute);

//database connection
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("DB connection successfully");
}).catch((err)=>{
    console.log(err.message);
});


//port listening
const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server Started on Port ${process.env.PORT}`);
});


//doing setup of chat socket
const io = socket(server,{
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket)=>{
    global.chatSocket = socket;
    socket.on("add-user", (userId)=>{
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    });
});