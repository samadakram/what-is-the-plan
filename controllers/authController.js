const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


exports.singup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the username is already taken
        const exitingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (exitingUser) {
            if (exitingUser.username === username) {
                return res.status(409).json({ message: 'Username already taken' });
            }
            if (exitingUser.email === email) {
                return res.status(409).json({ message: 'Email already registered' });
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User created' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare the passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, 'secret-key', {
            expiresIn: '1h',
        });

        res.status(200).json({ token, message: 'Logged-In Successfully' });
    } catch (error) {

    }
}