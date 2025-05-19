const { loginUser } = require("../services/auth.service");

async function login(req, res) {
    try {
        const loginPayload = req.body;
        const response = await loginUser(loginPayload);

        res.cookie("authToken", response.token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(200).json({
            message: "User logged in successfully",
            success: true,
            data: {
                role: response.role
            },
            error: {}
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            data: {},
            error: error,
            message: error.message || "An unexpected error occurred"
        });
    }
}

module.exports = login;
