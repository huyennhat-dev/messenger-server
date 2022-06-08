const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')
const socket = require("socket.io")


const authRoute = require('./route/auth')
const messageRoute = require('./route/message')


dotenv.config()


//connectDB
mongoose.connect((process.env.MONGODB_URL), () => {
    console.log('Connect to MongoDB successfully')
})

app.use(bodyParser.json({ limit: '50mb' }))

app.use(cors())

app.use(morgan('common'))

//routes
app.use('/messengerApi/v1/auth', authRoute)
app.use('/messengerApi/v1/message', messageRoute)

app.get('/getfile/:path', (req, res) => {
    res.download('./public/image/' + req.params.path)
})


const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
    console.log(`Server is running to port ${PORT}`)
})

const io = socket(server)

const onlineUsers = new Map();
io.on('connection', (socket) => {
    console.log(`Connection socket successfully ${socket.id}`)

    socket.on("add-user", (userId) => {
        console.log(onlineUsers.set(userId, socket.id))
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
       
        const sendUserSocket = onlineUsers.get(data.data.users[0]);
        if (sendUserSocket) {
             console.log(data)
            socket.broadcast.emit('message-receive', data.data)

            socket.broadcast.emit('message-notification', data)
        }

    });

    socket.on('disconnect', () => {
        console.log(`Disconnected ${socket.id}`)
        onlineUsers.delete(socket.id)
    })

})
