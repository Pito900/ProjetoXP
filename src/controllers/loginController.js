const express = require('express');
const { loginService } = require('../services/loginService');
const { generateToken } = require('../utils/JWT');

const route = express.Router();

const loginController = async (req, res) => {
    const { email, password } = req.body;
    const findUser = await loginService(email, password);
    if (!findUser) {
        return res.status(400).json({ message: 'Email ou Senha está incorretos' });
    }
    const token = generateToken(JSON.stringify({ email: findUser.email }));
    return res.status(200).json({ token });
};

module.exports = {
    route,
    loginController,
};