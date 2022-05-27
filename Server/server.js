const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const db = require('./queries')
const cors = require("cors")
const path = require("path");


const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.get('/articles', db.getArticles)
app.get('/categories',db.getCategories)
app.get('/articles/:id', db.getArticleById)
app.post('/articles', db.createArticle)
app.post('/categories',db.createCategory)
app.put('/articles/:id', db.updateArticle)
app.delete('/articles/:id', db.deleteArticle)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})