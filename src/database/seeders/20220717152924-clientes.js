module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Clientes',
      [
        {
          codCliente: 1,
          name: 'admin',
          email: 'admin@gmail.com',
          password: 'admin',
          image: 'admin',
          saldo: 1,
        },
        {
        codCliente: 2,
        name: 'Maria',
        email: 'maria@gmail.com',
        password: '123456',
        image: 'https://img2.gratispng.com/20180611/izx/kisspng-computer-icons-woman-user-profile-clip-art-5b1eb31dc26c43.4581156015287385897964.jpg',
        saldo: 1000000,
      },
      {
        codCliente: 3,
        name: 'Francisco',
        email: 'francisco@gmail.com',
        password: '123456',
        image: 'https://img2.gratispng.com/20180404/ire/kisspng-computer-icons-physician-login-medicine-user-avatar-5ac45a4d44fe99.2456489015228176132826.jpg',
        saldo: 1000000,
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Clientes', null, {});
  },
};