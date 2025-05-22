const nodemailer = require("nodemailer");
const { ALERT_EMAIL, ALERT_EMAIL_PASSWORD } = require("../configs/nodemailerConfig");

const transporter = nodemailer.createTransport({
    service: "gmail", // or "hotmail", "yahoo", or your SMTP config
    auth: {
        user: ALERT_EMAIL,       // Sender email
        pass: ALERT_EMAIL_PASSWORD   // App-specific password
    }
});

/**
 * Sends a critical alert email to the doctor.
 * @param {string} to - Doctor's email address
 * @param {string} patientName - Name of the patient
 * @param {string} summary - AI summary of condition
 */
async function sendCriticalAlertEmail(DOC_EMAIL, patientName, summary) {
    const mailOptions = {
        from: `"Recovaid Alerts" <${ALERT_EMAIL}>`,
        to: DOC_EMAIL,
        subject: `⚠️ Critical Health Alert for Patient: ${patientName}`,
        text: `
            A high criticality score has been detected in your patient's latest daily status update.

            Summary:
            ${summary}

            Please review this patient's condition as soon as possible.
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Alert email sent:", info.response);
    } catch (err) {
        console.error("Failed to send alert email:", err);
    }
}

module.exports = { sendCriticalAlertEmail };
