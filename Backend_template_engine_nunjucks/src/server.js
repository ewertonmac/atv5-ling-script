import express from 'express';
import nunjucks from 'nunjucks';
import dataVideos from '../dataVideos.json';

const server = express();
server.use(express.static('public'));
server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.set('view engine', 'njk');

nunjucks.configure('src/views', {
    express:server, 
    autoescape:false,
    noCache:true
})

server.get('/', (request, response)=>{
    const dadosUsuarios ={
        avatar_url:"https://avatars1.githubusercontent.com/u/62598805?s=460&u=be39aa9d611cfa852f701a36f145d7ba02e62ebd&v=4",
        name:"Fabio Abrantes",
        role:"professor de programação WEB.",
        description:"Professor das disciplinas de Linguagens de Script, programação Web 1,    Programação para dispositivos móveis e Gestão de TI do ",
        links:[
            {name: "Github", url:"https://github.com/fabioabrantes"},
            {name: "Twitter", url:"https://twitter.com/Fabinho_Bala"},
            {name: "Linkedin", url:"https://www.linkedin.com/in/fabio-abrantes-diniz-a1357221/"}
        ]
    }
     return response.render('index', {dados:dadosUsuarios});
});

server.get('/classes', (request, response)=>{
    console.log(dataVideos);
    response.render('classes', {dados:dataVideos});
});

server.listen(5000, ()=>{
    console.log('server running');
});