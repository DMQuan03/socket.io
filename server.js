const express = require("express")
const app = express()
const http = require('http')
const mongoose = require("mongoose")

const { Server } = require("socket.io")
const cors = require("cors")
const { emit } = require("process")
const RouterMess = require("./routes/mess")
const RouterRoom = require("./routes/room")

const Mess = require("./models/mess")
const Room = require("./models/roomchat")

app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/f8_education_dev")
app.use(express.json())

const server = http.createServer(app)

app.use("/v1/mess", RouterMess)
app.use("/v1/room", RouterRoom)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {

    socket.on("join_room", async (data) => {
        const newRoom = await new Room({
            idRoom: data.UserId1 + data.UserId2
        })

        console.log(newRoom)
        const roomsNew = await newRoom.save()

        io.sockets.emit("success_Room", roomsNew)
    })

    socket.on("send_mess", async (data) => {
        const newMess = await new Mess({
            mess: data.text,
            idMess: data.userId
        })

        socket.join(data.room)

        const saveMess = await newMess.save()
        io.sockets.to(data.room).emit("server_return_mess", saveMess)
    })




    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });

    socket.on("disconnect", () => {
        console.log("user" + socket.id + "disConnect")
    })
})



server.listen(3001, () => {
    console.log("server is running from 3001")
})


