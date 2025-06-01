// const mongoose = require('mongoose');
// const serverConfig = require('./serverConfig');

// /**
//  * The below function helps us to connect to a mongodb server
//  */
// async function connectDB() {
//     try {
//         await mongoose.connect(serverConfig.DB_URL);
//         console.log("Successfully connected to the mongo db server .....");
//     } catch (error) {
//         console.log("Not able to connect to the mongodb server");
//         console.log(error);
//     }
// }

// module.exports = connectDB;





const mongoose = require('mongoose');
const serverConfig = require('./serverConfig');

let isConnected = false;

async function connectDB() {
    if (isConnected) {
        //  Use existing connection
        return;
    }

    try {
        const db = await mongoose.connect(serverConfig.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed");
        throw error;
    }
}

module.exports = connectDB;
