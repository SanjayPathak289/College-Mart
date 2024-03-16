const express = require("express");
const auth = require("../middleware/auth");
const { getMessages, postMessages } = require("../controllers/messageController");
const router = express.Router();
router.use(express.json());

router.route("/messages").get(auth, getMessages).post(auth, postMessages);

module.exports = router