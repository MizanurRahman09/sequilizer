const userController = require('../controllers/userController');

const router = require('express').Router();

// Route to register a new user
router.post('/register', userController.register);

// Route to fetch all users
router.get('/alluser', userController.getAllUsers);

module.exports = router;
