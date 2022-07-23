require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USER || "root",
    "password": process.env.DB_PASSWORD || null,
    "database": process.env.DB_NAME || "projetoxp",
    "host": process.env.DB_HOSTNAME || "localhost",
    "port": process.env.MYSQL_PORT || '3306',
    "dialect": "mysql",
    "dialectOptions": {
      timezone: 'Z',
    },    
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.USERNAME_POSTGRES,
    "password": process.env.PASSWORD_POSTGRES,
    "database": process.env.DB_NAME_POSTGRES,
    "host": process.env.HOST_POSTGRES,
    "port": process.env.DB_PORT_POSTGRES,
    "dialect": "postgres",
    "dialectOptions": {
      timezone: 'Z',
    },
  }
}

