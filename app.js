/***************************
 * Import das bibliotecas
        npm install prisma --save
        npx prisma
        npx prisma init
        npm install @prisma/client

 */

//Import dos arquivos controller_aluno e config
const controllerJogo = require('./controllerJs/controllerJogo.js')


const message = require('./controllerJs/modulo/config.js')


//Import das bibliotecas
const express        = require('express')

const cors           = require('cors')

const bodyParser     = require('body-parser')


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

//Criando uma const para realizar o processo de padronização de dados que vão chegar no body da requisição
const bodyJSON = bodyParser.json();


//EndPoint que retorna todos os dados de alunos
app.get('/v1/abcdown/jogo', cors(), async function(request, response){

});


//EndPoints retorna dados do aluno pelo id
app.get('/v1/abcdown/jogo/:id', cors(), async function(request, response){

});


//EndPoints inserir um novo aluno
app.post('/v1/abcdown/jogo', cors(), bodyJSON, async function(request, response){

}); 


//EndPoints que atualiza um aluno pelo ID
app.put('/v1/abcdown/jogo/:id', cors(), bodyJSON, async function(request, response){

})


//EndPoints que exclui um aluno pelo ID
app.delete('/v1/abcdown/jogo/:id', cors(), async function(request, response){

})


app.listen(8080, function(){
       console.log('Servidor aguardando requisições na porta 8080');
   })


