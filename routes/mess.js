const express = require("express")
const NewMess = require("../models/mess")

const Router1 = express.Router()

Router1.post("/", async (req, res) => {
    try {
        const newMess = await new NewMess({
            mess: req.body.mess
        })

        newMess.save()


        return res.status(200).json(newMess)
    } catch (error) {
        console.log(error)
        return res.status(500).json("Err from server")
    }
})

Router1.get("/", async (req, res) => {
    try {

        const mess = await NewMess.find()
        return res.status(200).json(mess)
    } catch (error) {
        return res.status(500).json("err from server")
    }
})

module.exports = Router1