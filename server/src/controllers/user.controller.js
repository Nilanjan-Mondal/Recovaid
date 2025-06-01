const userService = require("../services/user.service");

async function createUser(req, res) {
  try {
    const user = await userService.registerUser(req.body);
    return res.status(201).json({
      message: "User created successfully",
      success: true,
      data: user,
      error: {}
    });
  } catch (error) {
    console.error("Error in createUser:", error);
    return res.status(error.statusCode || 500).json({
      message: error.message || "Unexpected error",
      success: false,
      data: {},
      error
    });
  }
}


async function getAllDoctors(req, res) {
    try {
      const doctors = await userService.fetchDoctors();
      return res.status(200).json({
        message: "Doctors fetched successfully",
        success: true,
        data: doctors,
        error: {}
      });
    } catch (error) {
      console.error("Error in getAllDoctors:", error);
      return res.status(500).json({
        message: "Failed to fetch doctors",
        success: false,
        data: [],
        error
      });
    }
  }


async function getUser(req, res) {
  const userId = req.params.id;
  try {
    const user = await userService.fetchUserById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        data: {},
        error: {}
      });
    }
    return res.status(200).json({
      message: "User fetched successfully",
      success: true,
      data: user,
      error: {}
    });
  } catch (error) {
    console.error("Error in getUser:", error);
    return res.status(500).json({
      message: "Failed to fetch user",
      success: false,
      data: {},
      error
    });
  }
}


async function getUserOnLogin(req, res) {
  const userId = req.user.id;
  try {
    const user = await userService.fetchUserById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        data: {},
        error: {}
      });
    }
    return res.status(200).json({
      message: "User fetched successfully",
      success: true,
      data: user,
      error: {}
    });
  } catch (error) {
    console.error("Error in getUserOnLogin:", error);
    return res.status(500).json({
      message: "Failed to fetch user",
      success: false,
      data: {},
      error
    });
  }
}

module.exports = {
  createUser, getAllDoctors, getUser, getUserOnLogin
};
