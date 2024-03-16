const express = require("express");
const auth = require("../middleware/auth");
const { getReferral, getMyReferral } = require("../controllers/referralController");
const router = express.Router();
router.use(express.json());

router.route("/").get(auth, getReferral);
router.route("/myreferrals").get(auth, getMyReferral);

module.exports = router