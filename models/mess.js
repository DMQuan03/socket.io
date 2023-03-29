const mongoose = require("mongoose")

const newMess = new mongoose.Schema({
    mess: { type: String },
    idMess: { type: String, require: true },
    // avatar: { type: String, require: true },
    // username: { type: String, require: true }
})

module.exports = mongoose.model("mess", newMess)