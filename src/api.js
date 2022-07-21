const express = require('express');
require('express-async-errors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/swagger.json');

const app = express();

app.use(express.json());
app.use(require('./routes'));
app.use(require('./middlewares/error'));

app.use('/apiDocs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
