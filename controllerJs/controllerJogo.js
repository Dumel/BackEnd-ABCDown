/********************************************************************************************************************************************************** 
 * Objetivo: Implementa a regra de negócio entre o app e a model
 * Autor: Melqui
 * Data: 24/04/2023
 * Versão: 1.0
 
**********************************************************************************************************************************************************/

const jogoDAO = require('../model/dao/jogoDAO.js');

const message = require('./modulo/config.js');


const selecionarTodosJogos = async function () {


    let dadosJogo = await jogoDAO.selectAllJogo()


    let dadosJson = {}


    if (dadosJogo) {

        dadosJson.status = 200;
        dadosJson.count = dadosJogo.length;
        dadosJson.jogos = dadosJogo
        return dadosJson
    } else {
        return message.ERROR_NOT_FOUND
    }
};


const buscarIdJogo = async function (id) {


    if (id == '' || id == undefined || isNaN(id))
        return message.ERROR_REQUIRED_ID
    else {



        let dadosJogo = await jogoDAO.selectByIdJogo(id)


        let dadosJSON = {}

        if (dadosJogo) {
            dadosJSON.status = 200
            dadosJSON.jogos = dadosJogo
            return dadosJSON

        } else {
            return message.ERROR_NOT_FOUND
        }

    }
};


const inserirJogo = async function (dadosJogo) {


    if (dadosJogo.nome == '' || dadosJogo.nome == undefined || dadosJogo.nome.length > 45 ||
        dadosJogo.descricao == '' || dadosJogo.descricao == undefined ||
        dadosJogo.id_nivel == '' || dadosJogo.id_nivel == undefined

    ) {

        return message.ERROR_REQUIRED_DATA


    } else {
        let status = await jogoDAO.insertJogo(dadosJogo)

        if (status) {
            let dadosJson = {}
            dadosJson.status = message.CREATED_ITEM.status
            dadosJson.jogo = dadosJogo

            return dadosJson

        } else
            return message.ERROR_INTERNAL_SERVER
    }

}


const atualizarJogo = async function (dadosJogo, idJogo) {

    if (dadosJogo.nome == '' || dadosJogo.nome == undefined || dadosJogo.nome.length > 45 ||
        dadosJogo.descricao == '' || dadosJogo.descricao == undefined ||
        dadosJogo.id_nivel == '' || dadosJogo.id_nivel == undefined

    ) {
        return message.ERROR_REQUIRED_DATA

    } else if (idJogo == '' || idJogo == undefined || isNaN(idJogo)) {

        return message.ERROR_REQUIRED_ID

    } else {

        dadosJogo.id = idJogo

        let status = await jogoDAO.updateJogo(dadosJogo)

        if (status) {

            let dadosJSON = {}

            dadosJSON.status = message.UPDATE_ITEM.status
            dadosJSON.jogos = dadosJogo

            return dadosJSON

        } else

            return message.ERROR_INTERNAL_SERVER

    }
};


const deletarJogo = async function (idJogo) {

    if (idJogo == '' || idJogo == undefined || isNaN(idJogo)) {

        return message.ERROR_REQUIRED_ID

    } else {


        let status = await jogoDAO.deleteJogo(idJogo)

        if (status)
            return message.DELETE_ITEM
        else
            return message.ERROR_INTERNAL_SERVER
    }
};




module.exports = {
    selecionarTodosJogos,
    inserirJogo,
    atualizarJogo,
    deletarJogo,
    buscarIdJogo
}