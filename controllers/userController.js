const db = require('../models');
const bcrypt = require('bcrypt'); // Import bcrypt

const User = db.users;

// Register a new user
const register = async (req, res) => {
    try {
        const info = {
            username: req.body.username,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10), // Hash password
        };
        const user = await User.create(info);
        
        // Respond without sending the password
        res.status(201).send({
            id: user.id,
            username: user.username,
            email: user.email,
        });
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: 'Error registering user', error: error.message });
    }
};

// Get all users (excluding password)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email'],
        });
        res.status(200).send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching users', error: error.message });
    }
};

module.exports = {
    register,
    getAllUsers,
};
