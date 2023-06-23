const jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'secret-key');
        req.user = { userId: decodedToken.userId };
        console.log("authMW==> req.user", req.user);
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid or missing token' });
    }
}