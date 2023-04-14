import jwt from "jsonwebtoken";
import "dotenv/config.js";

// Middleware to authenticate user using JWT token
const AuthenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodedToken.userId;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export default AuthenticateUser;