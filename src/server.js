/* criando o servidor */
const express= require("express")

/**
 * começando o servidor
 */

 const server = express()
//config  cominhos da aplicação
/*fazer com que o express reconheça o public como pasta normal */
//use cofigurações do servidor
server.use(express.static("public"))

//utilizando template nunjucks engenere

const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache : true
})
server.get("/",function(req,res){
    //req é uma requisição
    //res é uma resposta
   return res.render("index.html",{
       title: "Um titulo"
   })
})
server.get("/create-point",function(req,res){
    //req é uma requisição
    //res é uma resposta
    return res.render("create-point.html")
})
server.get("/search",function(req,res){
    //req é uma requisição
    //res é uma resposta
    return res.render("search.html")
})


 /*ligar o servidor */
 server.listen(3000)