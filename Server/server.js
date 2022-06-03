const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const db = require('./queries')
const cors = require("cors")
const path = require("path");

app.use(bodyParser.json())
app.use(cors())
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
app.get('/article/:id', db.getArticleById)
app.post('/article/new', db.createArticle)
app.post('/categories/new',db.createCategory)
app.put('/article/:id', db.updateArticle)
app.delete('/article/:id', db.deleteArticle)
app.delete('/category/:id',db.deleteCategory)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})