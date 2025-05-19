const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../configs/serverConfig");

function isLoggedIn(req, res, next) {
    const token = req.cookies["authToken"];
    if (!token) {
        return res.status(401).json({
            success: false,
            data: {},
            error: "Unauthorized",
            message: "No auth token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            data: {},
            error: "Unauthorized",
            message: "Invalid or expired token"
        });
    }
}

function isDoctor(req, res, next) {
    if (req.user.role === "doctor") return next();
    return res.status(403).json({
        success: false,
        message: "Access denied. Doctors only."
    });
}

function isPatient(req, res, next) {
    if (req.user.role === "patient") return next();
    return res.status(403).json({
        success: false,
        message: "Access denied. Patients only."
    });
}

module.exports = {
    isLoggedIn,
    isDoctor,
    isPatient
};
