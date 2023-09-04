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

    //Import do arquivo do acessso ao BD
   //Solicita ao DAO todos os alunos do BD
   let dadosNivel = await nivelDAO.selectAllNivel()

   //Cria um objeto do tipo JSON
   let dadosJson = {}

   //Valida se o bd teve registros
   if (dadosNivel) {
       //Adiciona o array de alunos e um JSON para retornar ao app
       dadosJson.status = 200;
       dadosJson.count = dadosNivel.length;
       dadosJson.niveis = dadosNivel
       return dadosJson
   } else {
       return message.ERROR_NOT_FOUND
   }
};

const buscarIdNivel = async function (id) {

    //Validação para id
    if (id == '' || id == undefined || isNaN(id))
        return message.ERROR_REQUIRED_ID
    else {


        //Solicita ao DAO todos os alunos do BD
        let dadosNivel = await nivelDAO.selectByIdNivel(id)

        //Cria um objeto do tipo JSON
        let dadosJSON = {}

        //Valida se o bd teve registros
        if (dadosNivel) {
            //Adiciona o array de alunos e um JSON para retornar ao app
            dadosJSON.status = 200
            dadosJSON.niveis = dadosNivel
            return dadosJSON

        } else {

            return message.ERROR_NOT_FOUND
        }

    }

}

//Função para receber os dados do APP e enviar para a model para atualizara um item existente
const atualizarNivel = async function (dadosJogo, idJogo) {

    if (dadosJogo.nivel == '' || dadosJogo.nivel == undefined ||
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