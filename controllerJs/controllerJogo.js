/********************************************************************************************************************************************************** 
 * Objetivo: Implementa a regra de negócio entre o app e a model
 * Autor: Melqui
 * Data: 24/04/2023
 * Versão: 1.0
 
**********************************************************************************************************************************************************/

//Import dos arquivos js
const jogoDAO = require('../model/dao/jogoDAO.js');

const message = require('./modulo/config.js');


//Função para inserir um aluno
const inserirJogo = async function (dadosJogo) {

    let erro = {}

    if (dadosJogo.nome_jogo == '' || dadosJogo.nome_jogo == undefined || dadosJogo.nome_jogo.length > 45 ||
        dadosJogo.descricao_jogo == '' || dadosJogo.descricao_jogo == undefined || dadosJogo.descricao_jogo.length > 500 
        
       ) {
        message.ERROR_REQUIRED_DATA

    } else {

        //Envia os dados para o model a serem inseridos no BD
        let status = await jogoDAO.insertJogo(dadosJogo)

        if (status) {
            
            let dadosJson = {}

            let jogoNovoId = await jogoDAO.selectLastId();
            dadosJogo.id = jogoNovoId;

            dadosJson.status = message.CREATED_ITEM.status
            dadosJson.jogo = dadosJogo

            return dadosJogo
            
        }else

            return message.ERROR_INTERNAL_SERVER
    }

}


//Função para receber os dados do APP e enviar para a model para atualizara um item existente
const atualizarJogo = async function (dadosJogo, idJogo) {

};


//Função para excluir um aluno filtrado pelo ID, que será encaminhado para a model
const deletarJogo = async function (idJogo) {

};


//Função para retornar todos os itens da tabela recebidos da model
const selecionarTodosJogos = async function () {

};


//Função para buscar um item filtrado pelo id, que será encaminhado para a model
const buscarIdJogo = async function (id) {

};


module.exports = {
    selecionarTodosJogos,
    inserirJogo,
    atualizarJogo,
    deletarJogo,
    buscarIdJogo
}