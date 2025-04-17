import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;  // Correct way to get token

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
        }

        const token = authHeader.split(' ')[1];  // Extract the actual token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.error("JWT Error:", error.message);
        res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};

export default authUser;
