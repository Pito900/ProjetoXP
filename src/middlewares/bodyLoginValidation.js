const bodyLoginValidation = (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
        return res.status(400).json({ message: 'Algum camo está incompleto' });
    }
    next();
};
module.exports = {
    bodyLoginValidation,
}; 