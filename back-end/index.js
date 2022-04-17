const express = require('express')
const app = express()
const port = 8080
const JSONdb = require('simple-json-db');
const db = new JSONdb('./db/transactions.json');
const cors = require('cors')
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

app.use(express.json())
app.use(cors())

app.post('/register/transaction', (req, res) => {
    // Chama o método JSON do objeto JSONdb
    const key = db.JSON();

    //Verifica o valor da última chave no banco de dados e retorna implicitamente o valor da função, armazenando-o em uma varíavel
    const lastKey = () => key[Object.keys(key).pop()]?.id
    
    const currentDate = new Date();

    //Verifica se há algum registro em banco e a partir disto determina o sequenciamento dos dados e das chaves
    key[0] ?
        db.set(lastKey() + 1, { ...req.body, id: lastKey() + 1, spending: formatter.format(req.body.spending), date: currentDate.toString() }) :
        db.set(0, { ...req.body, id: 0, spending: formatter.format(req.body.spending), date: currentDate.toString() });

    //Avalia se o registro em banco foi bem suceddido para retorno da requisição
    const verifyDB = db.has(lastKey() ? lastKey() + 1 : 0);

    res.send({ message: verifyDB ? 'Success' : 'Error', key: lastKey() && lastKey() + 1 || 0 })
})

app.get('/list/transactions', (req, res) => {
    const key = db.JSON();
    const lastKey = () => Object.keys(key);
    const newDataTransaction = lastKey().map((value) => {
        return key[value]
    })

    res.send(newDataTransaction)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})