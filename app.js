/***************************
 * Import das bibliotecas
        npm install prisma --save
        npx prisma
        npx prisma init
        npm install @prisma/client

 */

const controllerJogo = require('./controllerJs/controllerJogo.js')

const controllerNivel = require('./controllerJs/controllerNivel.js')

const controllerTeste = require('./controllerJs/controllerTeste.js')

const message = require('./controllerJs/modulo/config.js')


const express = require('express')

const cors = require('cors')

const bodyParser = require('body-parser')

const bodyJSON = bodyParser.json();

const app = express();


app.use((request, response, next) => {

       response.header('Access-Control-Allow-Origin', '*')

       response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

       app.use(cors())

       next()
});






/***************************** CRUD DOS JOGOS  ***********************/

app.get('/v1/abcdown/jogo', cors(), async function (request, response) {

       let dados = await controllerJogo.selecionarTodosJogos()

       response.status(dados.status)
       response.json(dados)
});


app.get('/v1/abcdown/jogo/:id', cors(), async function (request, response) {

       let idJogo = request.params.id;

       let dados = await controllerJogo.buscarIdJogo(idJogo)

       response.status(dados.status)
       response.json(dados)
});


//EndPoints inserir um novo aluno
app.post('/v1/abcdown/jogo', cors(), bodyJSON, async function (request, response) {

       let contentType = request.headers['content-type']

       if (String(contentType).toLowerCase() == 'application/json') {

              let dadosBody = request.body


              let resultInsertDados = await controllerJogo.inserirJogo(dadosBody)

              response.status(resultInsertDados.status)
              response.json(resultInsertDados)

       } else {
              response.status(message.ERROR_CONTENT_TYPE.status)
              response.json(message.ERROR_CONTENT_TYPE)
       }
});


app.put('/v1/abcdown/jogo/:id', cors(), bodyJSON, async function (request, response) {

       let dadosBody = request.body

       let idJogo = request.params.id

       let resultUpdateDados = await controllerJogo.atualizarJogo(dadosBody, idJogo)

       response.status(resultUpdateDados.status)
       response.json(resultUpdateDados)
})


//EndPoints que exclui um aluno pelo ID
app.delete('/v1/abcdown/jogo/:id', cors(), async function (request, response) {

       let idJogo = request.params.id

       let resultDeleteDados = await controllerJogo.deletarJogo(idJogo)

       response.status(resultDeleteDados.status)
       response.json(resultDeleteDados)
})









/***************************** CRUD DOS NIVEIS  ***********************/
app.post('/v1/abcdown/nivel', cors(), bodyJSON, async function (request, response) {

       let contentType = request.headers['content-type']

       if (String(contentType).toLowerCase() == 'application/json') {

              let dadosBody = request.body
              console.log(dadosBody);

              let resultInsertDados = await controllerNivel.inserirNivel(dadosBody)

              console.log(resultInsertDados);

              response.status(resultInsertDados.status)
              response.json(resultInsertDados)

       } else {
              response.status(message.ERROR_CONTENT_TYPE.status)
              response.json(message.ERROR_CONTENT_TYPE)
       }
});



app.get('/v1/abcdown/nivel', cors(), async function (request, response) {

       let dados = await controllerNivel.selecionarTodosNiveis()
     
       response.status(dados.status)
       response.json(dados)
});


app.get('/v1/abcdown/nivel/:id', cors(), async function (request, response) {

       let idNivel = request.params.id;

       let dados = await controllerNivel.buscarIdNivel(idNivel)

       response.status(dados.status)
       response.json(dados)
})

//EndPoints que atualiza um aluno pelo ID
app.put('/v1/abcdown/nivel/:id', cors(), bodyJSON, async function (request, response) {

    
       let dadosBody = request.body


       let idJogo = request.params.id

       let resultUpdateDados = await controllerNivel.atualizarNivel(dadosBody, idJogo)

       response.status(resultUpdateDados.status)
       response.json(resultUpdateDados)
})


//EndPoints que exclui um aluno pelo ID
app.delete('/v1/abcdown/nivel/:id', cors(), async function (request, response) {

       let idNivel = request.params.id

       let resultDeleteDados = await controllerNivel.deletarNivel(idNivel)

       response.status(resultDeleteDados.status)
       response.json(resultDeleteDados)
})







app.post('/v1/abcdown/redefinir-senha', cors(), bodyJSON, async function (request, response) {

       let contentType = request.headers['content-type']

       if (String(contentType).toLowerCase() == 'application/json') {

              let dadosBody = request.body
              //console.log("teste");

              let status = await controllerTeste.updateSenha(dadosBody)

              

              response.status(status.status)
              response.json(status)

       } else {
              response.status(message.ERROR_CONTENT_TYPE.status)
              response.json(message.ERROR_CONTENT_TYPE)
       }
});






app.listen(8030, function () {
       console.log('Servidor aguardando requisições na porta 8080');
})


