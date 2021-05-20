// Requiring NPM libraries:
const express = require("express");
const app = express();
// Requiring Data Base connection's module from dbConnect.js:
require("./dataBase/dbConnect")
// Requiring Environment Variables from config.js: 
const { PORT_SERVER } = require("./config")
// Base Router: Requiring apiRouter from routes.js.
const apiRouter = require("./routes/apiRoutes");
// Global Middlewares:
app.use(express.json())
app.use(express.urlencoded({extended: true}));
// app.use(expressJWT(OPTIONS))

// Opening main API route:
app.use("/delilahResto", apiRouter);

// Lifting up the Server:
app.listen(PORT_SERVER, () => {
  console.log("Te encuentras en el servidor que aloja a Delilah Resto. Puerto:", PORT_SERVER);
})