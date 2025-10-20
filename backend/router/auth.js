import jwt from 'jsonwebtoken';
import express from 'express'; 
const router = express.Router();

const verifyToken = (token) => {
    if (!token) {
        throw new Error('No token provided');
    }
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};


router.get('/me', (req, res) => {
    try {
        const token = req.cookies.authToken;
        const decoded = verifyToken(token);
        res.json({
            success: true,
            user: {
                id: decoded.userId,
                name: decoded.name,
                email: decoded.email,
            },
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            error: { code: 'UNAUTHORIZED', message: error.message },
        });
    }
});

export default router;