const express = require("express");
const { createUser, getAllDoctors, getUser, getUserOnLogin } = require("../controllers/user.controller");
const { isLoggedIn, isPatient } = require("../validations/authValidator");

const router = express.Router();

router.post("/signup", createUser);
router.get("/doctors", getAllDoctors);
router.get("/me", isLoggedIn, isPatient, getUserOnLogin)
router.get("/:id", getUser);


module.exports = router;
