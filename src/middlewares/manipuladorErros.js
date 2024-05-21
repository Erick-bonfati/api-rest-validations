// Os middlewares servem para capturar erros da nossa requisição para a API
// É como se entrasse no meio de uma ação e interceptasse ela de alguma forma...

import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

// eslint-disable-next-line no-unused-vars
function manipuladorErros(erro, req, res, next) {
  // console.log(erro); mostrar o erro direto no INSOMNIA
  
  if (erro instanceof mongoose.Error.CastError) { // Verifica se o erro que vai ser lançado no Cast, no caso se a requisição está inválida
    new RequisicaoIncorreta().enviarResposta(res);
  } else if(erro instanceof mongoose.Error.ValidationError) { // quando houver um erro de validação, ex: corpo da req vazia...
    new ErroValidacao(erro).enviarResposta(res);
  } else if(erro instanceof NaoEncontrado) { // se é uma instancia da nossa classe "NaoEncontrado"
    erro.enviarResposta(res);
  } else {
    new ErroBase().enviarResposta(res);
  }
}

export default manipuladorErros;