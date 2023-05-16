const express = require('express');
const routes = require('./routes');
const cors = require("./middlewares/cors");
const errorHandle = require("./middlewares/error");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandle);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta localhost:${port}`);
});
