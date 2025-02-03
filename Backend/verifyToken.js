const jwt = require('jsonwebtoken'); // Ensure correct import

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Extract token from Bearer

        jwt.verify(token, 'kh4nfi3uyio', (err, user) => {
            if (err) {
                console.error("Token verification failed:", err.message);
                return res.status(403).send({ message: 'Invalid token' });
            }
            req.user = user;
            console.log("Token verified, user:", user);
            next(); // Proceed to the route handler
        });
    } else {
        console.error("Authorization header missing");
        res.status(401).send({ message: 'Authorization header missing' });
    }
}

module.exports = verifyToken;
