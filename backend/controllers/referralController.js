const UserCred = require("../db/coll");

const getReferral = async (req, res) => {
    const referralId = req.query.id;
    const userId = referralId.substring(0, 24);
    const productId = referralId.substring(24);
    
    const product = await UserCred.findOne({
        productinfo: {
            $elemMatch: {
                _id: productId
            }
        }
    }, {
        'productinfo.$': 1,
        'fname': 1,
        'lname': 1
    })
    if (product) {
        res.json(product)
    }
}
const getMyReferral = async (req, res) => {
    const id = req.query.id;
    const data = await UserCred.findOne({
        _id: id
    }, {
        referrals: 1
    })
    res.json(data);
}

module.exports = { getReferral, getMyReferral }