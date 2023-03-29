const express = require("express")
const Room = require("../models/roomchat")

const Router2 = express.Router()



Router2.get("/", async (req, res) => {
    try {
        const rooms = await Room.find()
        console.log(rooms)
        return res.status(200).json(rooms)
    } catch (error) {
        return res.status(500).json("err from server")
    }
})

module.exports = Router2