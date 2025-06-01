const bcrypt = require("bcrypt");
const userRepo = require("../repositories/user.repository");

async function registerUser(userDetails) {
  const existingUser = await userRepo.findUser({
    email: userDetails.email,
    phone: userDetails.phone
  });

  if (existingUser) {
    throw {
      message: "User already exists with this email and phone number",
      statusCode: 400
    };
  }

  // Validate required fields based on role
  const { role } = userDetails;

  if (!["patient", "doctor"].includes(role)) {
    throw {
      message: "Invalid role. Must be either 'patient' or 'doctor'",
      statusCode: 400
    };
  }

  if (role === "patient") {
    const requiredFields = ["name", "email", "phone", "password", "surgeryDetails", "recoveryTimeDays", "assignedDoctor", "startDate"];
    for (let field of requiredFields) {
      if (!userDetails[field]) {
        throw {
          message: `Missing required field for patient: ${field}`,
          statusCode: 400
        };
      }
    }
  }

  if (role === "doctor") {
    const requiredFields = ["name", "email", "phone", "password", "specialization"];
    for (let field of requiredFields) {
      if (!userDetails[field]) {
        throw {
          message: `Missing required field for doctor: ${field}`,
          statusCode: 400
        };
      }
    }
  }

  const hashedPassword = await bcrypt.hash(userDetails.password, 10);

  const newUser = await userRepo.createUser({
    role: userDetails.role,
    name: userDetails.name,
    email: userDetails.email,
    phone: userDetails.phone,
    password: hashedPassword,
    specialization: role === "doctor" ? userDetails.specialization : undefined,
    surgeryDetails: role === "patient" ? userDetails.surgeryDetails : undefined,
    recoveryTimeDays: role === "patient" ? userDetails.recoveryTimeDays : undefined,
    assignedDoctor: role === "patient" ? userDetails.assignedDoctor : undefined,
    startDate: role === "patient" ? userDetails.startDate : undefined
  });

  if (!newUser) {
    throw {
      message: "Something went wrong, user not created",
      statusCode: 500
    };
  }

  return newUser;
}


async function fetchDoctors() {
  const doctors = await userRepo.findUsersByRole("doctor");
  return doctors;
}


async function fetchUserById(userId) {
  const user = await userRepo.findUserById(userId);
  if (!user) {
    throw {
      message: "User not found",
      statusCode: 404
    };
  }
  return user;
}


module.exports = {
  registerUser, fetchDoctors, fetchUserById
};
