const { createStatusEntry, getStatusesByPatient, getStatusesByDoctor } = require("../repositories/dailyStatus.Repository");
//const { sendCriticalAlertEmail } = require("../utils/emailUtils"); // Optional, if implemented

// Dummy AI logic for now
function calculateCriticality(symptoms, temperature) {
    let score = 0;
    if (temperature > 101) score += 5;
    if (symptoms?.toLowerCase().includes("pus")) score += 5;
    if (symptoms?.toLowerCase().includes("pain") || symptoms?.toLowerCase().includes("redness")) score += 3;
    return score;
}

function generateAISummary(symptoms, temperature) {
    return `Patient reported ${symptoms}, Temperature: ${temperature}°F. Evaluation required.`;
}

async function createDailyStatusService(patientId, body) {
    const {
        doctorId, 
        symptoms,
        temperature,
        imageUrls
    } = body;

    const criticalityScore = calculateCriticality(symptoms, temperature);
    const aiSummary = generateAISummary(symptoms, temperature);

    const alertSent = criticalityScore >= 8;

    const newStatus = await createStatusEntry({
        patient: patientId,
        doctor: doctorId,
        symptoms,
        temperature,
        imageUrls,
        aiSummary,
        criticalityScore,
        alertSent
    });

    if (alertSent) {
        // Optional: Send email to doctor
        // await sendCriticalAlertEmail(doctorId, aiSummary);
    }

    return newStatus;
}

async function getPatientStatusesService(patientId) {
    return await getStatusesByPatient(patientId);
}

async function getDoctorStatusesService(doctorId) {
    return await getStatusesByDoctor(doctorId);
}

module.exports = {
    createDailyStatusService,
    getPatientStatusesService,
    getDoctorStatusesService
};
