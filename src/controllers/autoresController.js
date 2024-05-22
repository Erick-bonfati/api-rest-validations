import { autores } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class AutorController {

  static listarAutores = async(req, res, next) => {
    try {
      const autoresResultado = autores.find();

      req.resultado = autoresResultado; // o resultado da requisição vai ser o resultado que recebemos nos parametros da nossa funcao "paginar"
      
      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    
    try {
      const id = req.params.id;
  
      const autorResultado = await autores.findById(id); // Por padrão quando não é encontrado um id ele retorna "NULL"

      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else{
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro); // obtem o erro do controller, e envia para o middleware de tratameto de erros
    }
  };
  
  
  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);
  
      const autorResultado = await autor.save();
  
      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };
  

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
  
      const autorAtualizar = await autores.findByIdAndUpdate(id, {$set: req.body});

      if(autorAtualizar !== null) {
        res.status(200).send({message: "Autor atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
  
      
    } catch (erro) {
      next(erro);
    }
  };
  
  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
  
      const autorExluir = await autores.findByIdAndDelete(id);
  
      if(autorExluir !== null) {
        res.status(200).send({message: "Autor excluido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }

    } catch (erro) {
      next(erro);
    }
  };
  

}

export default AutorController;