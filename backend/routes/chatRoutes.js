const express = require("express");
const auth = require("../middleware/auth");
const { conversation, getConversation, allConversation } = require("../controllers/chatController");
const router = express.Router();
router.use(express.json());

router.route("/conversation").post(auth, conversation);
router.route("/conversation/:userId/:receiverId").get(auth, getConversation);
router.route("/allconversation/:userId").get(auth, allConversation);

module.exports = router

