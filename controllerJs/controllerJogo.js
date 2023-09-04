/********************************************************************************************************************************************************** 
 * Objetivo: Implementa a regra de negócio entre o app e a model
 * Autor: Melqui
 * Data: 24/04/2023
 * Versão: 1.0
 
**********************************************************************************************************************************************************/

//Import dos arquivos js
const jogoDAO = require('../model/dao/jogoDAO.js');

const message = require('./modulo/config.js');


//Função para retornar todos os itens da tabela recebidos da model
const selecionarTodosJogos = async function () {

     //Import do arquivo do acessso ao BD
    //Solicita ao DAO todos os alunos do BD
    let dadosJogo = await jogoDAO.selectAllJogo()

    //Cria um objeto do tipo JSON
    let dadosJson = {}

    //Valida se o bd teve registros
    if (dadosJogo) {
        //Adiciona o array de alunos e um JSON para retornar ao app
        dadosJson.status = 200;
        dadosJson.count = dadosJogo.length;
        dadosJson.jogos = dadosJogo
        return dadosJson
    } else {
        return message.ERROR_NOT_FOUND
    }
};


//Função para buscar um item filtrado pelo id, que será encaminhado para a model
const buscarIdJogo = async function (id) {

     //Validação para id
     if (id == '' || id == undefined || isNaN(id))
     return message.ERROR_REQUIRED_ID
 else {


     //Solicita ao DAO todos os alunos do BD
     let dadosJogo = await jogoDAO.selectByIdJogo(id)

     //Cria um objeto do tipo JSON
     let dadosJSON = {}

     //Valida se o bd teve registros
     if (dadosJogo) {
         //Adiciona o array de alunos e um JSON para retornar ao app
         dadosJSON.status = 200
         dadosJSON.jogos = dadosJogo
         return dadosJSON

     } else {

         return message.ERROR_NOT_FOUND
     }

 }
};


//Função para inserir um aluno
const inserirJogo = async function (dadosJogo) {
    

    if (dadosJogo.nome == '' || dadosJogo.nome == undefined || dadosJogo.nome.length > 45 ||
        dadosJogo.descricao == '' || dadosJogo.descricao == undefined 
        
       ) {
        
       return message.ERROR_REQUIRED_DATA


    } else {
        
        //Envia os dados para o model a serem inseridos no BD
        let status = await jogoDAO.insertJogo(dadosJogo) 
        
        
        if (status) {
            let dadosJson = {}

            // let jogoNovoId = await jogoDAO.selectLastId();
            // dadosJogo.id = jogoNovoId;

            dadosJson.status = message.CREATED_ITEM.status
            dadosJson.jogo = dadosJogo

            return dadosJson
            
        }else

            return message.ERROR_INTERNAL_SERVER
    }

}


//Função para receber os dados do APP e enviar para a model para atualizara um item existente
const atualizarJogo = async function (dadosJogo, idJogo) {
    if (dadosJogo.nome == '' || dadosJogo.nome == undefined || dadosJogo.nome.length > 45 ||
        dadosJogo.descricao == '' || dadosJogo.descricao == undefined

    ) {
        return message.ERROR_REQUIRED_DATA

        //Validação para o ID
    } else if (idJogo == '' || idJogo == undefined || isNaN(idJogo)) {

        return message.ERROR_REQUIRED_ID
    
    } else {
        //Add o id no json com todos os dados
        dadosJogo.id = idJogo

        let status = await nivelDAO.UpdateNivel(dadosJogo)

        if (status) {
            
            let dadosJSON = {}

            dadosJSON.status = message.UPDATE_ITEM.status
            dadosJSON.niveis = dadosJogo

            return dadosJSON
        
        }else

            return message.ERROR_INTERNAL_SERVER

    }
};


//Função para excluir um aluno filtrado pelo ID, que será encaminhado para a model
const deletarJogo = async function (idJogo) {

};




module.exports = {
    selecionarTodosJogos,
    inserirJogo,
    atualizarJogo,
    deletarJogo,
    buscarIdJogo
}