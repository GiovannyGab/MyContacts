const express = require('express');
const routes = require('./routes');
require('express-async-errors');

const app = express();
const port = 3000;
app.use(express.json());
app.use(routes);

app.use((error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta localhost:${port}`);
});
