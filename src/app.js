import express from "express";
import db from "./config/dbConnect.js";
import manipuladorErros from "./middlewares/manipuladorErros.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("conexão com o banco feita com sucesso");
});

const app = express();
app.use(express.json());
routes(app);

app.use(manipuladorErros);

export default app;