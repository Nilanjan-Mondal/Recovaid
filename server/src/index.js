const express = require('express');
const cors = require('cors');
const serverConfig = require('./configs/serverConfig');
const connectDB = require('./configs/dbConfig');
const cookieParser = require('cookie-parser')

const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const dailyStatusRoutes = require("./routes/dailyStatus.routes");
const respondToStatusRoutes = require("./routes/respondToStatus.routes");
const { isLoggedIn } = require('./validations/authValidator');


const app = express();

app.use(cors({
    origin: "https://recovaid.vercel.app", // Replace with your client's origin for localhost
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add the methods you need
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get('/', (req, res) => {
    return res.json({
        message: "Welcome to Recovaid..."
    })
})

app.get('/ping', isLoggedIn, (req, res) => {
    return res.json({message: "pong"});
})

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/status", dailyStatusRoutes);
app.use("/api/status/respond", respondToStatusRoutes);

//server starts here
app.listen(serverConfig.PORT, async () => {
    await connectDB();
    console.log(`Server started at port ${serverConfig.PORT}...!!`);
});



