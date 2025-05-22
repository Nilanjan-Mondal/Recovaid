const { updateDoctorResponse } = require("../repositories/respondToStatus.repository");



async function addDoctorResponseService(statusId, doctorId, response) {

    return await updateDoctorResponse(statusId, doctorId, response);

}   

module.exports = { addDoctorResponseService };
