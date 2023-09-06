/********************************************************************************************************************************************************** 
 * Objetivo-TCC: API para interagir com o banco de dados (GET, POST, DELETE, PUT);
 * Autor: Melqui, Kaue;
 * Data: 23/08/2023;
 * Versão: 1.0;
 
**********************************************************************************************************************************************************/

const {PrismaClient} = require('@prisma/client');

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

    let sql = 'select * from tbl_nivel'


    let rsNivel = await prisma.$queryRawUnsafe(sql)

    if (rsNivel.length > 0)
        return rsNivel
    else
        return false
}


const selectByIdNivel = async function (id) {

    let sql = `select * from tbl_nivel where id = ${id}`

    let rsNivel = await prisma.$queryRawUnsafe(sql)

    if (rsNivel.length > 0)
        return rsNivel
    else
        return false
}

const UpdateNivel = async function (dadosNivel) {
   let sql = `update tbl_nivel set
                        nivel = '${dadosNivel.nivel}',
                        descricao = '${dadosNivel.descricao}'`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false
    
}

const deleteNivel = async function (id) {
    let sql = `delete from tbl_nivel 
                        where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false
}




module.exports = {
    insertNivel,
    selectAllNivel,
    selectByIdNivel,
    UpdateNivel,
    deleteNivel
}