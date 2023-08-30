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

const buscarIdJogo = async function (id) {

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



module.exports = {
    inserirNivel,
    selecionarTodosNiveis,
    buscarIdJogo
}