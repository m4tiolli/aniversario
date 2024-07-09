const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

require("./endpoints")(app);

app.listen(port, () => {
  console.log(`Servidor executando na porta ${port}!`);
});