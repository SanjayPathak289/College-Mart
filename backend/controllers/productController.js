const UserCred = require("../db/coll");

const addItem = async (req, res) => {
    const { pname, pdesc, pcateg, pprice, pimage } = JSON.parse(req.body.json);
    await UserCred.updateOne({
        email: req.user
    }, {
        $push: {
            productinfo: {
                pname,
                pdesc,
                pcateg,
                pprice,
                pimage
            }
        }
    })
    res.json({ success: true });
}

const myproducts = async (req, res) => {
    const userProducts = await UserCred.findOne({ email: req.user },
    );
    return res.json(userProducts);
    //auth check krlega signin or not
}
const products = async (req, res) => {
    const allProducts = await UserCred.find();
    return res.json(allProducts);
}
const addwishlist = async (req, res) => {
    const { pname, pdesc, pcateg, pprice, pimage } = req.query.param2;
    const userId = req.query.param1;
    var data;
    try {
        data = await UserCred.findOne({
            _id: userId,
            wishlist: {
                $elemMatch: {
                    $and: [
                        {
                            pname,
                            pdesc,
                            pcateg,
                            pprice,
                            pimage,
                        }, {
                            _id: { $exists: true }
                        }
                    ]
                }
            }
        })
    } catch (error) {
        console.log(error);
    }
    if (data) {
        res.json({ inwishList: true });
    }
    else {
        res.json({ inwishList: false });
    }
}

const postAddWishList = async (req, res) => {
    const userId = req.body.userId;
    const { pname, pdesc, pcateg, pprice, pimage } = req.body.product;
    await UserCred.updateOne({
        _id: userId
    }, {
        $push: {
            wishlist: {
                pname,
                pdesc,
                pcateg,
                pprice,
                pimage,
            }
        }
    })
    res.json({ added: true });
}
const deleteWishList = async (req, res) => {
    const userId = req.body.userId;
    const product = req.body.product;
    const d = await UserCred.updateOne(
        {
            _id: userId
        }, {
        $pull: {
            wishlist: {
                pname: product.pname,
                pdesc: product.pdesc,
                pcateg: product.pcateg,
                pprice: product.pprice,
                pimage: product.pimage,
            }
        }
    }
    )
    res.json({ deleted: true });
}
const deleteCourse = async (req, res) => {
    const product = req.body.product;
    const userId = req.body.userId;
    await UserCred.updateOne(
        {
            _id: userId
        },
        {
            $pull: {
                productinfo: {
                    pname: product.pname,
                    pdesc: product.pdesc,
                    pcateg: product.pcateg,
                    pprice: product.pprice,
                    pimage: product.pimage,
                }
            }
        }
    )
    res.json({ deleted: true })
}

const updateCourse = async (req, res) => {
    const product = req.body.product;
    const userId = req.body.userId;
    await UserCred.updateOne(
        {
            _id: userId,
            "productinfo": {
                $elemMatch: {
                    "_id": product._id
                }
            }
        },
        {
            $set: {
                "productinfo.$.pname": product.pname
            }
        }
    )
    res.json({ updated: true })
}
module.exports = { addItem, myproducts, products, addwishlist, postAddWishList, deleteWishList, deleteCourse, updateCourse }