const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    message: {
        text: { type: String, required: true },
    },
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true,
    },
}, {
    timestamps: true,
});

let Message = mongoose.model('Message', messageSchema)

module.exports = { Message }