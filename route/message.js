const messageController = require("../controller/messageController");

const router = require("express").Router();

router.post("/addmsg/", messageController.addMessage)

router.post("/getmsg/", messageController.getMessages)

module.exports = router;