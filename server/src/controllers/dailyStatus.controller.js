const {
    createDailyStatusService,
    getPatientStatusesService,
    getDoctorStatusesService
} = require("../services/dailyStatus.service");

async function createDailyStatus(req, res) {
    try {
        console.log("createDailyStatus request body:", req.body);
        const patientId = req.user.id;
        const data = await createDailyStatusService(patientId, req.body);
        return res.status(201).json({
            success: true,
            message: "Status submitted successfully",
            data,
            error: {}
        });
    } catch (error) {
        console.error("createDailyStatus error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to submit status",
            data: {},
            error
        });
    }
}

async function getMyStatuses(req, res) {
    try {
        const statuses = await getPatientStatusesService(req.user.id);
        return res.status(200).json({
            success: true,
            message: "Statuses fetched",
            data: statuses,
            error: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch statuses",
            data: {},
            error
        });
    }
}

async function getStatusesForDoctor(req, res) {
    try {
        const statuses = await getDoctorStatusesService(req.user.id);
        return res.status(200).json({
            success: true,
            message: "Statuses for doctor fetched",
            data: statuses,
            error: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch statuses",
            data: {},
            error
        });
    }
}

module.exports = {
    createDailyStatus,
    getMyStatuses,
    getStatusesForDoctor
};
