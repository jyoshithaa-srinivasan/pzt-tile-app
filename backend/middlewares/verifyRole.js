// middlewares/verifyRole.js
const verifyRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(403).json({ message: 'No user authenticated' });
        }

        // Check if the user's role is included in the allowed roles
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
        }

        next(); // If role is valid, proceed to the next middleware or route handler
    };
};

module.exports = verifyRole;
