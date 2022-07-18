const { tokenVerification } = require('../utils/JWT');

 const validateToken = async (req, res, next) => {
    const { authorization } = req.headers;
     const payload = tokenVerification(authorization);
     if (payload === 'Token not found') {
        return res.status(401).json({ message: 'Token not found' });
     } if (payload === 'Expired or invalid token') {
        return res.status(401).json({ message: 'Expired or invalid token' });
     }
     res.locals.payload = payload;
     next();
 };

module.exports = { 
    validateToken, 
}; 