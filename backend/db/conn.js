const mongoose = require("mongoose");
const connectDb = async () => {

    try {
        // const conn = await mongoose.connect("mongodb://127.0.0.1/shop", {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB Connection Successful")

    } catch (error) {
        console.log(error)

    }

}
module.exports.connectDb = connectDb;

