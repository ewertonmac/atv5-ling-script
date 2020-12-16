const { response, request } = require('express');
const express = require('express');
const server = express();
const nunjucks = require('nunjucks')
const fs = require('fs');
const data = require('../data.json');
const multer = require('./middlewares/multer')

server.use(express.static('public'));
server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.set('view engine', 'html');
nunjucks.configure(__dirname + '/views', {express:server});


server.get('/', (request, response)=>
{
    return response.render('index')
})

server.post('/index', multer.array('photos', 6), (request, response) => 
{
    const dados = request.body;
    const chaves = Object.keys(dados);
    for(chave of chaves)
    {
        if(dados[chave] === "")
        {
            response.send('por favor, preencha todos os campos!')
        }
    }
    const arquivos = request.files;
    console.log(arquivos);
    if(arquivos.length == 0)
    {
        return response.send('por favor, envie pelo menos uma imagem!')
    }
    const {name, description} = dados;
    let filePaths = [];

    arquivos.forEach(file => 
    {
        const {path} = file;
        filePaths.push(path);
    })

    data.products.push
    (
        {
            name,
            description,
            filePaths
        }
    )

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (error) => 
        {
            if(error) return response.send('erro durante a escrita no arquivo json');
        }
    )
    return response.redirect('/');
    
})


server.listen(5000, ()=>
{
    console.log("Server is running");
})