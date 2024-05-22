import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

async function paginar(req, res, next) {

  try {
    let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;

    let [campoOrdenacao, ordem] = ordenacao.split(":"); // faz a separação da ornenadacao do mais recente e ajustado por decrescente
    // ex: livros?ordenacao=titulo:1 // ordena pela ordem alfabetica e pela criacão
  
    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const resultado = req.resultado;
  
    if(limite > 0 && pagina > 0) {
      const resultadoPaginado = await resultado.find()
        // .sort({titulo: -1})
        .sort({ [campoOrdenacao]: ordem }) //filtra pelo mais recente e ordena do mais recente criado
        .skip((pagina - 1) * limite)
        .limit(limite)
        .exec();
  
      res.status(200).json(resultadoPaginado);
    } else {
      next(new RequisicaoIncorreta());
    }
  } catch (erro){
    next(erro);
  }
  
}

export default paginar;