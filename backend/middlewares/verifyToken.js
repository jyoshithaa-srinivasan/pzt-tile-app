// middlewares/verifyToken.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming the User model exists

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
    // Extract the token from the Authorization header (Bearer <token>)
    const token = req.headers['authorization']?.split(' ')[1];

    // If no token is found, return a 403 error
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the JWT secret key

        // Find the user in the database using the userId stored in the token
        const user = await User.findById(decoded.userId);

        // If user is not found, return a 404 error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach the user data to the request object for use in subsequent middleware/route
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If the token is invalid or expired, return a 500 error
        return res.status(500).json({ message: 'Failed to authenticate token', error: error.message });
    }
};

module.exports = verifyToken;
