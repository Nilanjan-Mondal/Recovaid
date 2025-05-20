const DailyStatus = require("../schemas/dailyStatusSchema");

// Create a new daily status
async function createStatusEntry(data) {
    return await DailyStatus.create(data);
}

// Get statuses for a patient
async function getStatusesByPatient(patientId) {
    return await DailyStatus.find({ patient: patientId }).sort({ date: -1 });
}

// Get statuses for a doctor
async function getStatusesByDoctor(doctorId) {
    return await DailyStatus.find({ doctor: doctorId }).sort({ criticalityScore: -1 });
}

module.exports = {
    createStatusEntry,
    getStatusesByPatient,
    getStatusesByDoctor
};
