require('dotenv').config();
const jwt = require('jsonwebtoken');

const { BadRequestError, UnauthenticatedError } = require('./../errors/index');

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new BadRequestError('Please Provide Email And Password');
    }

    const id = new Date().getDate();
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
    res.status(200).json({ message: 'user created', token });
}

const dashboard = async (req, res) => {
    try {
        const luckyNumber = Math.floor(Math.random() * 100);
        res.status(200).json({ message: `Hello, ${req.user.username}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}`});
    } catch (error) {
        throw new UnauthenticatedError('No authorized to access this route');
    }
}

module.exports = {
    login, dashboard
};