const message = require ('../controllerJs/modulo/config.js')

const testeDAO = require ('../model/dao/testeDAO.js')


const updateSenha = async function(dadosSenha){
    if(dadosSenha.email == "" || dadosSenha.senha == undefined || dadosSenha.senha == ""){
        return message.ERROR_INTERNAL_SERVER
    }else{ 

        const statusUpdate = testeDAO.UpdateTeste(dadosSenha)
        if(statusUpdate){
            return message.UPDATE_ITEM
        }else{
            return message.ERROR_REQUIRED_DATA
        }

        console.log(dadosSenha);
    }
}

module.exports = {
    updateSenha
}