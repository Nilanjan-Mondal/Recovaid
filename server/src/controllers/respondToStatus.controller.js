const { addDoctorResponseService } = require("../services/respondToStatus.service");

async function respondToStatus(req, res) {
  const { statusId } = req.params;
  const doctorId = req.user.id;
  const { response } = req.body;

  try {
    const updatedStatus = await addDoctorResponseService(statusId, doctorId, response);
    res.status(200).json({
        message: "Doctor's response added successfully.",
        data: updatedStatus,
        error: null
    });
  } catch (error) {
    console.error("Error responding to status:", error);
    res.status(500).json({ error: "Failed to respond to status." });
  }
}

module.exports = { respondToStatus };
