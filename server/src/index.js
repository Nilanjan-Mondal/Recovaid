const express = require('express');
const cors = require('cors');
const serverConfig = require('./configs/serverConfig');
const connectDB = require('./configs/dbConfig');

const userRoutes = require("./routes/user.routes");


const app = express();

app.use(cors({
    origin: "http://localhost:5173", // Replace with your client's origin for localhost
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add the methods you need
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    return res.json({
        message: "Welcome to Recovaid..."
    })
})

app.use("/api/users", userRoutes);

//server starts here
app.listen(serverConfig.PORT, async () => {
    await connectDB();
    console.log(`Server started at port ${serverConfig.PORT}...!!`);
});



