// Os middlewares servem para capturar erros da nossa requisição para a API
// É como se entrasse no meio de uma ação e interceptasse ela de alguma forma...

import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function manipuladorErros(erro, req, res, next) {
  console.log(erro);
  
  if (erro instanceof mongoose.Error.CastError) { // Verifica se o erro que vai ser lançado no Cast, no caso se a requisição está inválida
    res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos."});
  } else {
    res.status(500).send({message: "Erro interno do servidor"});
  }
}

export default manipuladorErros;