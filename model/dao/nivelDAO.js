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

const insertNivel = async function (dadosNivel){
    console.log(dadosNivel);

    let sql =   `insert into tbl_nivel (
                
                    nivel,
                    descricao
                    
                )
                
                    values  (
                    
                    '${dadosNivel.nivel}',
                    '${dadosNivel.descricao}'
                )`
    const test = await prisma.$executeRawUnsafe(sql)
    return test
}



const selectAllNivel = async function (dadosNivel) {

    //Variável com scriptSQL para executar no BD
    let sql = 'select * from tbl_nivel'


    let rsNivel = await prisma.$queryRawUnsafe(sql)

    if (rsNivel.length > 0)
        return rsNivel
    else
        return false
}



const selectByIdNivel = async function (id) {

    //Variável com scriptSQL para executar no BD
    let sql = `select * from tbl_nivel where id = ${id}`

    //Executa bo banxo de dados o scriptSQL
    //$queryRawUnsafe() é utilizado quando o scriptSQL estar em uma variável
    //$queryRaw() é utilizado quansonpassar o scipt direto no metodo(Ex>$queryRaw('select * from tbl_aluno'))
    let rsNivel = await prisma.$queryRawUnsafe(sql)

    if (rsNivel.length > 0)
        return rsNivel
    else
        return false
}




module.exports = {
    insertNivel,
    selectAllNivel,
    selectByIdNivel
}