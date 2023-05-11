// Import the important packages
const jwt = require('jsonwebtoken');
const config = require("../config/config");

// Define the auth function
exports.isAdmin = async (req, res, next) => {
    try {
        const accessToken = req.body.accessToken;
        if (accessToken) {
            jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET, (err, decoded) => {
                console.log(decoded);
                if (err) {
                    return res.status(403).send('Invalid token');
                }
                if (decoded.role === 'admin') {
                    return next();
                }
                return res.status(403).send('Unauthorized');
            });
        } else {
            return res.status(401).send('Missing token');
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}