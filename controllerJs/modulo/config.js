/********************************************************************************************************************************************************** 
 * Objetivo: Arquivo responsável pelas variaveis, constantes e funções globais do projeto
 * Autor: Melqui
 * Data: 28/04/2023
 * Versão: 1.0
 
**********************************************************************************************************************************************************/

/********************************************CONSTANTES DE ERROS *********************************************** */

const ERROR_REQUIRED_DATA = {status: 400, message: 'Existem dados obrigatórios que não foram preenchidos.'}
const ERROR_REQUIRED_ID = {status: 400, message: 'O atributo ID é obrigatório na requisição'}
const ERROR_INTERNAL_SERVER = {status: 500, message: 'Erro interno no servidor do bda.'}
const ERROR_CONTENT_TYPE = {status: 415, message: 'O tipo de midia content type da solicitação não é compativel com o servidor'}
const ERROR_NOT_FOUND = {status: 404, message: 'Nenhum registro encontrado na requisição'}

/********************************************CONSTANTES DE ERROS *********************************************** */
const CREATED_ITEM = {status:  201, message: 'Registro criado com sucesso.'}
const UPDATE_ITEM = {status:  201, message: 'Registro atualizado com sucesso.'}
const DELETE_ITEM = {status:  201, message: 'Registro deletado com sucesso.'}

module.exports = {
   ERROR_REQUIRED_DATA,
   ERROR_REQUIRED_ID,
   ERROR_INTERNAL_SERVER,
   CREATED_ITEM,
   UPDATE_ITEM,
   DELETE_ITEM,
   ERROR_CONTENT_TYPE,
   ERROR_NOT_FOUND
}