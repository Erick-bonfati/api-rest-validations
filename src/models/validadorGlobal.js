import mongoose from "mongoose";

//Aqui vamos definir uma propriedade para todos os campos do tipo "String do meu modelo"
mongoose.Schema.Types.String.set("validate", {
  validator: (valor) => valor.trim() !== "", // se algum campo estiver vazio
  message: ({ path }) => `O campo '${path}' não foi preenchido.` // seleciona o campo que não foi preenchido e exibe na mensagem
});