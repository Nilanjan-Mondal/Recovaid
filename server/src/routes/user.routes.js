const express = require("express");
const { createUser, getAllDoctors } = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", createUser);
router.get("/doctors", getAllDoctors);


module.exports = router;
