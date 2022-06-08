const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('queries')
const cors = require("cors")
const path = require("path");
const PORT=process.env.PORT || 8080




app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
   
)
if(process.env.NODE_ENV==="production") {
  app.use(express.static(path.join(__dirname,"Client/build")))
}

app.get('/api', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.get('/api/articles', db.getArticles)
app.get('/api/categories',db.getCategories)
app.get('/api/article/:id', db.getArticleById)
app.post('/api/article/new', db.createArticle)
app.post('/api/categories/new',db.createCategory)
app.put('/api/article/:id', db.updateArticle)
app.delete('/api/article/:id', db.deleteArticle)
app.delete('/api/category/:id',db.deleteCategory)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
})

app.get("*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "  Client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(__dirname);
      }
    }
  );
});