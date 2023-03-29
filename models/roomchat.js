const moongose = require("mongoose")

const room = new moongose.Schema({
    idRoom: { type: String, required: true, unique: true },
    members: { type: Array, default: [] }
})

module.exports = moongose.model("room", room)