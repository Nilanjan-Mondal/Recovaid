const { findUser } = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../configs/serverConfig");

async function loginUser(authDetails) {
    const { email, password } = authDetails;

    const user = await findUser({ email });

    if (!user) {
        throw {
            message: "User not found with the provided email",
            statusCode: 404
        };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw {
            message: "Invalid password",
            statusCode: 400
        };
    }

    const role = user.role || "patient";

    const token = jwt.sign(
        { email: user.email, id: user._id, role },
        JWT_SECRET,
        { expiresIn: "60h" }
    );

    return {
        token,
        role
    };
}

async function logoutUser(req, res) {
    try {
        res.clearCookie("authToken").status(200).json({
            message: "User logged out successfully",
            success: true,
            data: {},
            error: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to logout"
        });
    }
}

module.exports = {
    loginUser,
    logoutUser
};
