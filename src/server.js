/* criando o servidor */
const express = require("express");

const server = express()

const db = require('./database/index')

server.use(express.urlencoded({ extend : false}));
server.use(express.json());

server.use(express.static("public"))

//utilizando template nunjucks engenere

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get('/', (req, res) => {
    return res.render('index.html')
})

server.get('/create-point', (req, res) => {
    return res.render('create-point.html')
})



server.post('/savepoint', (req, res) => {
    const query = `
        // INSERT INTO places (
        //     name,
        //     address,
        //     address2,
        //     state,
        //     city,
        //     items
        // ) VALUES ($1, $2, $3, $4, $5, $6, $7);
    `

    console.log("teste", req.body);

    const values = [

        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]



    function afterInsertData(err) {
        // if (err) {
        //     return res.send('Erro no cadastro')
        // } else {

            console.log('Cadastrado com sucesso')
            // console.log(this)
    
            return res.render('create-point.html', { saved: true })
        

    }

    db.run(query, values, afterInsertData)
});



server.get('/search-results', (req, res) => {
    const search = req.query.search

    if (search == "") {
        return res.render('search.html', { total: 0 })
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        return res.render('search.html', { places: rows, total })
    })
})

/*ligar o servidor */
server.listen(3000)