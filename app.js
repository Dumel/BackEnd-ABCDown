/***************************
 * Import das bibliotecas
        npm install prisma --save
        npx prisma
        npx prisma init
        npm install @prisma/client

 */

//Import dos arquivos controller_aluno e config
const controllerJogo = require('./controllerJs/controllerJogo.js')

const controllerNivel = require('./controllerJs/controllerNivel.js')


const message = require('./controllerJs/modulo/config.js')


//Import das bibliotecas
const express        = require('express')

const cors           = require('cors')

const bodyParser     = require('body-parser')

//Criando uma const para realizar o processo de padronização de dados que vão chegar no body da requisição
const bodyJSON = bodyParser.json();

//Criar objeto app utilizando a classe do express
const app = express();


app.use((request, response, next)=> {

     //Permissões de origem da requisição
     response.header('Access-Control-Allow-Origin', '*')

     //permissões de metodos que serão utilizados na API
     response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
 
     //Define as permissões para o cors
     app.use(cors())
 
     //continua para a leitura dos EndPoints
     next()
 });

    
//CRUD (Create, Read, Update, e Delete)




//EndPoint que retorna todos os dados de alunos
app.get('/v1/abcdown/jogo', cors(), async function(request, response){

       //Solicita a controller que retorne todos os alunos do BD
       let dados = await controllerJogo.selecionarTodosJogos()

       //Valida se existem registros para retornar na requisição
       response.status(dados.status)
       response.json(dados)
});


//EndPoints retorna dados do aluno pelo id
app.get('/v1/abcdown/jogo/:id', cors(), async function(request, response){

       let idJogo = request.params.id;

     //Solicita a controller que retorne todos os alunos do BD
     let dados = await controllerJogo.buscarIdJogo(idJogo)

     //Valida se existem registros para retornar na requisição
     response.status(dados.status)
     response.json(dados)
});


//EndPoints inserir um novo aluno
app.post('/v1/abcdown/jogo', cors(), bodyJSON, async function(request, response){

       let contentType = request.headers['content-type']

       if (String (contentType).toLowerCase() == 'application/json') {

       //Recebe os dados encaminhados no body da requisição
       let dadosBody = request.body   
       

       let resultInsertDados = await controllerJogo.inserirJogo(dadosBody)
       
       response.status(resultInsertDados.status)
       response.json(resultInsertDados)
       

       //Retorna o status code e a message

       }else{
              response.status(message.ERROR_CONTENT_TYPE.status)
              response.json(message.ERROR_CONTENT_TYPE)
       }
}); 


//EndPoints que atualiza um aluno pelo ID
app.put('/v1/abcdown/jogo/:id', cors(), bodyJSON, async function(request, response){

})


//EndPoints que exclui um aluno pelo ID
app.delete('/v1/abcdown/jogo/:id', cors(), async function(request, response){

})









//EndPoints inserir um novo aluno
app.post('/v1/abcdown/nivel', cors(), bodyJSON, async function(request, response){

       let contentType = request.headers['content-type']

       if (String (contentType).toLowerCase() == 'application/json') {

       //Recebe os dados encaminhados no body da requisição
       let dadosBody = request.body   
       console.log(dadosBody);

       let resultInsertDados = await controllerNivel.inserirNivel(dadosBody)

       console.log(resultInsertDados);
       
       //Retorna o status code e a message
       response.status(resultInsertDados.status)
       response.json(resultInsertDados)

       }else{
              response.status(message.ERROR_CONTENT_TYPE.status)
              response.json(message.ERROR_CONTENT_TYPE)
       }
}); 



app.get('/v1/abcdown/nivel', cors(), async function(request, response){

       //Solicita a controller que retorne todos os alunos do BD
       let dados = await controllerNivel.selecionarTodosNiveis()

       //Valida se existem registros para retornar na requisição
       response.status(dados.status)
       response.json(dados)
});


app.get('/v1/abcdown/nivel/:id', cors(), async function(request, response){

       let idNivel = request.params.id;
   
        //Solicita a controller que retorne todos os alunos do BD
        let dados = await controllerNivel.buscarIdNivel(idNivel)
   
        //Valida se existem registros para retornar na requisição
        response.status(dados.status)
        response.json(dados)
   })

//EndPoints que atualiza um aluno pelo ID
app.put('/v1/abcdown/nivel/:id', cors(), bodyJSON, async function(request, response){

       //Recebe os dados do body
    let dadosBody = request.body

    //Recebe o id do aluno
    let idJogo = request.params.id

    let resultUpdateDados = await controllerNivel.atualizarNivel(dadosBody, idJogo)

    response.status(resultUpdateDados.status)
    response.json(resultUpdateDados)
})


//EndPoints que exclui um aluno pelo ID
app.delete('/v1/abcdown/nivel/:id', cors(), async function(request, response){
    
    let idNivel = request.params.id

    let resultDeleteDados = await controllerNivel.deletarNivel(idNivel)

    response.status(resultDeleteDados.status)
    response.json(resultDeleteDados)
})





app.listen(8007, function(){
       console.log('Servidor aguardando requisições na porta 8080');
   })


