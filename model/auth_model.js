const mongoose = require('mongoose')
var today = new Date();
var date = today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate();
var time = today.getHours() + '' + today.getMinutes() + '' + today.getSeconds();
var dateTime = date + time;

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    name: {
        type: String,
        default: 'User' + dateTime
    },
    image: {
        type: String,
        default: 'user-avatar.jpg'
    },
}, {
    timestamps: true,
});




let Auth = mongoose.model('Auth', authSchema)

module.exports = { Auth }