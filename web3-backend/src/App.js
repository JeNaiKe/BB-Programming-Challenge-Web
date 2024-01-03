const express = require("express");
const app = express();
const cors = require("cors");

// Configurações
app.set("port", process.env.PORT || 3001);

// Middlewares
app.use(express.json());

/*/ Configurar CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
}); /*/
app.use(cors());

//Importar Middleware criada
//const middleware = require("./middlewares/middleware");

// Rotas
app.use("/cmc", require("./routes/coinmarketcap.route"));

app.use("/", (req, res) => {
  res.send("\
  <p>\
  Route not defined, try the following:</p>\
    -  /cmc<br>\
         .. /top5");
});


app.listen(app.get("port"), () => {
  console.log("Start server on port " + app.get("port"));
});
