/********************************************************************************************************************************************************** 
 * Objetivo: Implementa a regra de negócio entre o app e a model
 * Autor: Melqui
 * Data: 24/04/2023
 * Versão: 1.0
 
**********************************************************************************************************************************************************/

//Import dos arquivos js
const nivelDAO = require ('../model/dao/nivelDAO.js')
const message = require ('../controllerJs/modulo/config.js')


const inserirNivel = async function (dadosNivel) {

    let erro = {}

    if (dadosNivel.nivel == '' || dadosNivel.nivel == undefined || 
        dadosNivel.descricao == '' || dadosNivel.descricao == undefined || dadosNivel.descricao.length > 50 
        
        ) {
            message.ERROR_REQUIRED_DATA
       
        }else{
            
            let status = await nivelDAO.insertNivel(dadosNivel)
            
 
            if (status) {

                let dadosJson = {}

                dadosJson.status = message.CREATED_ITEM.status
                dadosJson.nivel = dadosNivel

                return dadosJson
            }else

                return message.ERROR_INTERNAL_SERVER
        }
}


const selecionarTodosNiveis = async function () {

    
   let dadosNivel = await nivelDAO.selectAllNivel()

   
   let dadosJson = {}

  
   if (dadosNivel) {
       dadosJson.status = 200;
       dadosJson.count = dadosNivel.length;
       dadosJson.niveis = dadosNivel

       return dadosJson

   } else {
       return message.ERROR_NOT_FOUND
   }
};

const buscarIdNivel = async function (id) {

    if (id == '' || id == undefined || isNaN(id))
        return message.ERROR_REQUIRED_ID
    else {


        let dadosNivel = await nivelDAO.selectByIdNivel(id)


        let dadosJSON = {}

        if (dadosNivel) {
       
            dadosJSON.status = 200
            dadosJSON.niveis = dadosNivel

            return dadosJSON

        } else {
            return message.ERROR_NOT_FOUND
        }

    }

}


const atualizarNivel = async function (dadosJogo, idJogo) {

    if (dadosJogo.nivel == '' || dadosJogo.nivel == undefined ||
        dadosJogo.descricao == '' || dadosJogo.descricao == undefined

    ) {
        return message.ERROR_REQUIRED_DATA


    } else if (idJogo == '' || idJogo == undefined || isNaN(idJogo)) {

        return message.ERROR_REQUIRED_ID
    
    } else {

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
}

const deletarNivel = async function (idJogo) {
    if (idJogo == '' || idJogo == undefined || isNaN(idJogo)) {

        return message.ERROR_REQUIRED_ID

    } else {


        let status = await nivelDAO.deleteNivel(idJogo)

        if (status)
            return message.DELETE_ITEM
        else
            return message.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    inserirNivel,
    selecionarTodosNiveis,
    buscarIdNivel,
    atualizarNivel,
    deletarNivel
}