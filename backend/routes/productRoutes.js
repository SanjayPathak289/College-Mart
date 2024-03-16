const express = require("express");
const auth = require("../middleware/auth");
const uploadM = require("../middleware/uploadM");
const { addItem, myproducts, products, addwishlist, postAddWishList, deleteWishList, deleteCourse, updateCourse } = require("../controllers/productController");
const router = express.Router();
router.use(express.json())

router.route("/additem").post(auth, uploadM, addItem);
router.route("/myproducts").get(auth, myproducts);
router.route("/products").get(products)
router.route("/addwishlist").get(auth, addwishlist).post(auth, postAddWishList).delete(auth, deleteWishList)
router.route("/delete").delete(auth, deleteCourse);
router.route("/updateCourse").post(auth, updateCourse);

module.exports = router
