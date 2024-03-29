const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtConfig = {
    expiresIn: '10d', // coloquei 10d só pra o desenvolvimento
    algorithm: 'HS256',
};

const generateToken = (payload) => jwt.sign(JSON.parse(payload), JWT_SECRET, jwtConfig);

const tokenVerification = (token) => {
    if (!token) { // quando o token é vazio
        return 'Token not found';
    }
    try { // se o token vier correto
        const [a, tk] = token.split(' '); // pensei nesse if para rodar no insomnia e no swagger sem precisar eu ficar mudando sempre a variável
        if (a === 'Bearer') {
        const tokenValidationResult = jwt.verify(tk, JWT_SECRET, jwtConfig);
        return tokenValidationResult;
        }
        const tokenValidationResult = jwt.verify(token, JWT_SECRET, jwtConfig);
        return tokenValidationResult;
    } catch (e) { // o token veio, porém é inválido ou ta expirado (pasou 10 d)
        return 'Expired or invalid token';
    }
};

module.exports = {
    generateToken,
    tokenVerification,
};