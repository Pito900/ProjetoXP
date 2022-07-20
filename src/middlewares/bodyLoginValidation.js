const bodyLoginValidation = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Algum campo está incompleto' });
    }
    next();
};
module.exports = {
    bodyLoginValidation,
}; 