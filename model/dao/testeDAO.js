const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

const UpdateTeste = async function (dadosSenha) {
    
    let sqlEmail = `SELECT id, email FROM tbl_responsavel WHERE email ='${dadosSenha.email}' AND cpf = '${dadosSenha.cpf}'`
    let result = await prisma.$queryRawUnsafe(sqlEmail)

    if (result.length === 0) {
        return false
    } else {

        let allResponse = 'SELECT * from tbl_responsavel';

        let resultStatus = await prisma.$executeRawUnsafe(allResponse)
        console.log(resultStatus);

            let newPassword = `UPDATE tbl_responsavel  SET senha = '${dadosSenha.senha}' where id =${result[0].id}`
            let statusPassword = await prisma.$executeRawUnsafe(newPassword)

            if (statusPassword) {
                return true
            } else {
                return false
            }
        
    } 
 }

 module.exports = {
    UpdateTeste
 }