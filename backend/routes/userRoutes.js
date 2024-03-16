const express = require("express");
const auth = require("../middleware/auth");
const { registerUser, signUpUser, getUserInfo, signInUser, logOutUser, profile, getUser, getbyid, getPurchased, getSales, updateProfile } = require("../controllers/userController");
const router = express.Router();
router.use(express.json());

router.route("/").get(auth, registerUser);
router.post("/signup", signUpUser);
router.route("/getuserinfo").get(auth, getUserInfo);
router.route("/profile").get(auth, profile)
router.route("/profile").post(auth, updateProfile)
router.route("/signin").post(signInUser)
router.route("/logout").get(auth, logOutUser)
router.route("/getuser").get(auth, getUser)
router.route("/getbyid").get(auth, getbyid)
router.route("/purchased").get(auth, getPurchased)
router.route("/sales").get(auth, getSales)

module.exports = router