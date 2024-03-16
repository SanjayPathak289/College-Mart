const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path")
const db = require("./db/conn");
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const referralRoute = require("./routes/referralRoute");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://investment-compass.onrender.com/',
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
    optionSuccessStatus: 200
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/uploads", express.static("./public/Images"));


app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes)
app.use("/api/chats", chatRoutes)
app.use("/api/message", messageRoutes)
app.use("/referral", referralRoute);
app.use("/api/payment", paymentRoutes);

// ----------Deployment----------
const __dirname1 = path.resolve()
if (process.env.NODE_ENV === 'production') {
    console.log(__dirname1);
    app.use(express.static(path.join(__dirname1, '../frontend/frontendmart/dist')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname1, "../", "frontend", "frontendmart", "dist", "index.html"));
    })
}
else {
    app.get("/", (req, res) => {
        res.send("API Runnning successfully")
    })
}

// ----------Deployment----------

db.connectDb().then(() => {
    app.listen(8080, () => {
    })
});


