const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { orderPayment, verifyPayment, savePayment } = require("../controllers/paymentController");
const auth = require("../middleware/auth");

router.route("/orders").post(auth, orderPayment);
router.route("/verify").post(auth, verifyPayment);
router.route("/save").post(auth, savePayment);
module.exports = router;