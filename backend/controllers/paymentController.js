const Razorpay = require("razorpay")
const dotenv = require("dotenv");
const crypto = require("crypto");
const UserCred = require("../db/coll");
dotenv.config();

const orderPayment = async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET
        })
        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex")
        }

        instance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Error" })
            }
            res.status(200).json({ data: order })
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error" })
    }
}
const verifyPayment = async (req, res) => {
    try {

        const whoBought = req.body.whoBought;
        const refId = req.body.refId;
        const id = req.body.userId;
        const userId = refId ? refId.substring(0, 24) : null;
        const productId = refId ? refId.substring(24) : null;
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.response;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto.createHmac("sha256", process.env.KEY_SECRET).update(sign.toString()).digest("hex");
        if (razorpay_signature === expectedSign) {
            if (userId && productId) {
                const existingReferral = await UserCred.findOne({
                    _id: userId,
                    "referrals.refId": refId
                });

                if (existingReferral) {
                    await UserCred.updateOne(
                        {
                            _id: userId,
                            "referrals.refId": refId
                        },
                        {
                            $addToSet: {
                                "referrals.$.whoBought": { user: whoBought, time: new Date() }
                            },
                        }
                    );
                } else {
                    await UserCred.updateOne(
                        { _id: userId },
                        {
                            $push: {
                                referrals: {
                                    refId: refId,
                                    whoBought: [{ user: whoBought, time: new Date() }],
                                    productId: productId 
                                }
                            }
                        },
                        { upsert: true }
                    );
                }
            }
            else {
                await UserCred.updateOne({
                    _id: id
                }, {
                    $push: {
                        sales: [new Date()]
                    }
                })
            }




            return res.status(200).json({ message: "Payment Verified Successfully" })
        }
        else {
            return res.status(500).json({ message: "Invalid Signature" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error" })
    }
}
const savePayment = async (req, res) => {
    const userId = req.body.userId
    const productId = req.body.id;
    const productName = req.body.pname;
    const productPrice = req.body.pprice;
    await UserCred.updateOne({
        _id: userId
    }, {
        $push: {
            bought: {
                productId,
                productName,
                productPrice
            }
        }
    })
    res.json({ added: true });
}
module.exports = { orderPayment, verifyPayment, savePayment }