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

//Retorna todos os registros do banco de dados
const selectAllJogo = async function (dadosJogo){
    
    //Variável com scriptSQL para executar no BD
    let sql = 'select * from tbl_jogo'

     //Executa bo banxo de dados o scriptSQL
    //$queryRawUnsafe() é utilizado quando o scriptSQL estar em uma variável
    //$queryRaw() é utilizado quansonpassar o scipt direto no metodo(Ex>$queryRaw('select * from tbl_aluno'))
    let rsJogo = await prisma.$queryRawUnsafe(sql)

    if (rsJogo.length > 0)
        return rsJogo
    else
        return false
};


//retorna um Registro do banco de dados
const selectByIdJogo = async function (id){

    //Variável com scriptSQL para executar no BD
    let sql = `select * from tbl_jogo where id = ${id}`

    //Executa bo banxo de dados o scriptSQL
    //$queryRawUnsafe() é utilizado quando o scriptSQL estar em uma variável
    //$queryRaw() é utilizado quansonpassar o scipt direto no metodo(Ex>$queryRaw('select * from tbl_aluno'))
    let rsJogo = await prisma.$queryRawUnsafe(sql)

    if (rsJogo.length > 0)
        return rsJogo
    else
        return false
}

//Inserir um novo registro no banco de dados
const insertJogo = async function (dadosJogo) {

    

    //Script SQL para inserir os dados no BD
    let sql = `insert into tbl_jogo (

                nome,
                descricao,
                id_nivel
                )
                
                values(

                '${dadosJogo.nome}',
                '${dadosJogo.descricao}',
                ${dadosJogo.id_nivel}
                )`;
            


 //Executa o script SQL no BD e recebemos o retorno se deu certo ou não
 const test = await prisma.$executeRawUnsafe(sql)

 return test
};


//Atualizar um registro existente no banco de dados
const updateJogo = async function (dadosJogo){

    let sql = `update tbl_jogo set
                        nome = '${dadosJogo.nome}',
                        descricao = '${dadosJogo.descricao}',
                        id_nivel = ${dadosJogo.id_nivel}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false
};


//Excluir um registro no Banco de dados
const deleteJogo = async function (idJogo){
    
};


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