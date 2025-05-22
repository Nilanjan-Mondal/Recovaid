const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    ALERT_EMAIL: process.env.ALERT_EMAIL,
    ALERT_EMAIL_PASSWORD: process.env.ALERT_EMAIL_PASSWORD
}