const express = require('express');
const login = require('../controllers/auth.controller');
const { logoutUser } = require('../services/auth.service');
const { isLoggedIn } = require('../validations/authValidator');

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.get('/logout', logoutUser);

// Example protected route
authRouter.get('/protected', isLoggedIn, (req, res) => {
    res.status(200).json({ message: `Hello ${req.user.role}, you are authenticated.` });
});

module.exports = authRouter;
