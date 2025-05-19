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

module.exports = {
  createUser
};
