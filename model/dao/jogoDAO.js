/********************************************************************************************************************************************************** 
 * Objetivo-TCC: API para interagir com o banco de dados (GET, POST, DELETE, PUT);
 * Autor: Melqui, Kaue;
 * Data: 23/08/2023;
 * Versão: 1.0;
 
**********************************************************************************************************************************************************/


//Import da biblioteca do prisma client (responsável por manipular dados no BD)
const {PrismaClient} = require('@prisma/client');

//Instancia da classe do PrismaClient
const prisma = new PrismaClient();

//Inserir um novo registro no banco de dados
const insertJogo = async function (dadosJogo) {

    //Script SQL para inserir os dados no BD
    let sql = `insert into tbl_jogo (

                nome_jogo,
                descricao_jogo
                )
                
                values(

                '${dadosJogo.nome_jogo}',
                '${dadosJogo.descricao_jogo}'
                )`;


 //Executa o script SQL no BD e recebemos o retorno se deu certo ou não
    let result = await prisma.$executeRawUnsafe(sql)
    console.log(result);
        if(result)
            return true
    
        else
            return false
};


//Atualizar um registro existente no banco de dados
const updateJogo = async function (dadosJogo){

};


//Excluir um registro no Banco de dados
const deleteJogo = async function (idJogo){
    
};


//Retorna todos os registros do banco de dados
const selectAllJogo = async function (dadosJogo){

};


//retorna um Registro do banco de dados
const selectByIdJogo = async function (idJogo){

}


//se conecta a um banco de dados para recuperar o ID mais recente da tabela
const selectLastId = async function(){
    
    //Script
    let sql = `select id from tbl_jogo order by id desc limit 1`

    let rsJogo = await prisma.$querRawUnsafe(sql)

    if(rsJogo.length > 0)
        return rsJogo[0].id
    else
        return false

}

module.exports = {
    selectAllJogo,
    insertJogo,
    updateJogo,
    deleteJogo,
    selectByIdJogo,
    selectLastId
}