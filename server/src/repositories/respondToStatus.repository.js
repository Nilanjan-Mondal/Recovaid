const DailyStatus = require("../schemas/dailyStatusSchema");
async function updateDoctorResponse(statusId, doctorId, response) {
  const result =  await DailyStatus.findOneAndUpdate(
    { _id: statusId, doctor: doctorId },
    { doctorResponse: response,
      read: true
    },
    { new: true } // this helps in returning the updated object immediately without this we would get the old object in result
  );

  return result;
}

module.exports = { updateDoctorResponse };
