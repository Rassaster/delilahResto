// Requiring npm libraries:
const express = require("express");
const app = express();
require("./dataBase/dbConnect")

// Requiring Environment Variables
const { PORT_SERVER } = require("./config")

app.use(express.json())
app.use(express.urlencoded({extended: true}));
// app.use(expressJWT(OPTIONS))


app.listen(PORT_SERVER, () => {
  console.log("Te encuentras en el servidor que aloja a Delilah Resto. Puerto:", PORT_SERVER);
})