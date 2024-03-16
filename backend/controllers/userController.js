const UserCred = require("../db/coll");

const registerUser = async (req, res) => {
    if (req.user) {
        // return res.json({ valid: true, email: req.user });
        const data = await UserCred.findOne({ email: req.user });
        // console.log(data);
        return res.json(data);
    }
    else {
        return res.json({});
    }
}

const signUpUser = async (req, res) => {
    const ifUser = await UserCred.findOne({ email: req.body.email });
    if (!ifUser) {
        const userData = new UserCred({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            pass: req.body.pass,
        })
        await userData.save();
        return res.json({ ok: true });
    }
    else {
        return res.status(400).json({ message: "User exists" });
    }
}

const getUserInfo = async (req, res) => {
    try {
        if (req.user) {
            const data = await UserCred.findOne({ email: req.user });
            // console.log(data);
            return res.json(data);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}
const signInUser = async (req, res) => {
    // try{
    const userEmail = req.body.email;
    const pass = req.body.pass;
    try {
        const data = await UserCred.findOne({ email: userEmail });
        if (pass == data.pass) {
            const token = await data.generateAuthToken();
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 9999999),
                httpOnly: true,
            })
            req.user = userEmail;
            res.json(data);
        }
        else {
            res.status(500).json();
        }
    } catch (error) {
        res.status(500).json();
    }
}
const logOutUser = async (req, res) => {
    const userProfile = await UserCred.findOne({ email: req.user },
    );
    // console.log(userProfile);
    return res.json(userProfile);

}
const profile = async (req, res) => {
    const userProfile = await UserCred.findOne({ email: req.user },
    );
    // console.log(userProfile);
    // console.log(userProfile);
    return res.json(userProfile);

}
const updateProfile = async (req, res) => {
    const profile = req.body.profile;
    await UserCred.updateOne({
        _id: profile._id
    }, {
        $set: {
            fname: profile.fname,
            lname: profile.lname,
            email: profile.email
        }
    })
    res.json({ updated: true });
}
const getUser = async (req, res) => {
    const userId = req.query.user;
    // try {
    const finduser = await UserCred.findOne({ email: userId });
    // if (finduser != null) {
    res.status(200).json(finduser);
}
const getbyid = async (req, res) => {
    const userId = req.query.user;
    // try {
    const finduser = await UserCred.findOne({ _id: userId });
    // if (finduser != null) {
    res.status(200).json(finduser);
}
const getPurchased = async (req, res) => {
    const id = req.query.id;
    const purchasedArray = await UserCred.findOne({
        _id: id
    }, {
        bought: 1
    })
    return res.json(purchasedArray);
}
const getSales = async (req, res) => {
    const id = req.query.id;
    const salesArray = await UserCred.findOne({
        _id: id
    }, {
        sales: 1
    })
    return res.json(salesArray);
}
module.exports = { registerUser, signUpUser, getUserInfo, signInUser, logOutUser, profile, updateProfile, getUser, getbyid, getPurchased, getSales };