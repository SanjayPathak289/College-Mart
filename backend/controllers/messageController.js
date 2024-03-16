const Message = require("../db/message");

const getMessages = async (req, res) => {
    try {
        const allmessages = await Message.find({
            conversationId: req.query.cid
        });
        res.status(200).json(allmessages);
    } catch (error) {
        res.status(500).json(error);
    }
}
const postMessages = async (req, res) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json(error);
    }
}
module.exports = { getMessages, postMessages }