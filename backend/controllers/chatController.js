const Conversation = require("../db/conversation");

const conversation = async (req, res) => {
    // try {
    const myconversation = await Conversation.findOne({
        members: {
            $all: [req.body.members.senderId, req.body.members.receiverId]
        }

    })
    if (myconversation && myconversation._id) {
        return res.status(200).json(myconversation)
    }
    else {
        const newConversation = new Conversation({
            members: [req.body.members.senderId, req.body.members.receiverId]
        })
        // try {
        const savedConversation = await newConversation.save();
        return res.status(200).json(savedConversation);
    }
}

const getConversation = async (req, res) => {
    try {
        const myconversation = await Conversation.findOne({
            members: {
                $all: [req.params.userId, req.params.receiverId]
            }
        })
        res.status(200).json(myconversation);
    } catch (error) {
        res.status(500).json(error);
    }
}
const allConversation = async (req, res) => {
    try {
        const myconversation = await Conversation.find({
            members: {
                $in: [req.params.userId,]
            }
        })
        res.status(200).json(myconversation);
    } catch (error) {
        res.status(500).json(error);
    }
}
module.exports = { conversation, getConversation, allConversation }