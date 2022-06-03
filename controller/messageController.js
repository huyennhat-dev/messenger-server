const { Message } = require("../model/message_model");

const messageController = {
    getMessages: async(req, res) => {
        try {
            console.log(req.body)
            const { from, to } = req.body;

            const messages = await Message.find({
                users: {
                    $all: [from, to],
                },
            }).sort({ createdAt: 1 });

            const projectedMessages = messages.map((msg) => {
                return {
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message.text,
                };
            });

            res.status(200).json({
                data: projectedMessages
            });
        } catch (error) {
            res.status(500).json(error)
        }
    },
    addMessage: async(req, res) => {
        try {
            const { from, to, message } = req.body;
            const data = await Message.create({
                message: { text: message },
                users: [from, to],
                sender: from,
            });

            if (data) return res.status(200).json({ msg: "Message added successfully." });
            else return res.status(409).json({ msg: "Failed to add message to the database" });
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = messageController