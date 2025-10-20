import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(401).json({
            success: false,
            error: { code: 'UNAUTHORIZED', message: 'No token provided' }
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded?.userId ? String(decoded.userId) : null;
        req.user = { id: userId, name: decoded.name, email: decoded.email };
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: { code: 'UNAUTHORIZED', message: 'Invalid token' }
        });
    }
};