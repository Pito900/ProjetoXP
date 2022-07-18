const { Cliente } = require('../database/models');

const loginService = async (email, password) => {
    const findUser = await Cliente.findOne({
        where: { email, password },
    });
    return findUser;
};

module.exports = {
    loginService,
};