/********************************************************************************************************************************************************** 
 * Objetivo-TCC: API para interagir com o banco de dados (GET, POST, DELETE, PUT);
 * Autor: Melqui, Kaue;
 * Data: 23/08/2023;
 * Versão: 1.0;
 
**********************************************************************************************************************************************************/


const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

const selectAllJogo = async function (dadosJogo){
    
    let sql = `
        SELECT
            jogo.nome As nome_jogo,
            jogo.descricao AS descricao_jogo,
            jogo.id_nivel AS id_nivel_jogo,
            nivel.nivel AS nivel,
            nivel.descricao AS descricao_nivel
        FROM
            tbl_jogo AS jogo
        INNER JOIN
            tbl_nivel AS nivel ON jogo.id_nivel = nivel.id`
    


    let rsJogo = await prisma.$queryRawUnsafe(sql)

    if (rsJogo.length > 0)
        return rsJogo
    else
        return false
};


const selectByIdJogo = async function (id){

    
    let sql = `
        SELECT
            jogo.nome AS nome_jogo,
            jogo.descricao AS descricao_jogo,
            jogo.id_nivel AS id_nivel_jogo,
            nivel.nivel AS nivel,
            nivel.descricao AS descricao_nivel
        FROM
            tbl_jogo AS jogo
        INNER JOIN
            tbl_nivel AS nivel ON jogo.id_nivel = nivel.id
        WHERE
            jogo.id = ${id}
`;

    let rsJogo = await prisma.$queryRawUnsafe(sql)

    if (rsJogo.length > 0)
        return rsJogo
    else
        return false
}

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
                 ${dadosJogo.id_nivel},
                
                
                )`;

   


 const test = await prisma.$executeRawUnsafe(sql)

 return test
};


const updateJogo = async function (dadosJogo){

    let sql = `update tbl_jogo set
                        nome = '${dadosJogo.nome}',
                        descricao = '${dadosJogo.descricao}',
                        id_nivel = '${dadosJogo.id_nivel}'`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false
};


const deleteJogo = async function (id){
    
    let sql = `delete from tbl_jogo 
    where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false
};


const selectLastId = async function(){
    
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