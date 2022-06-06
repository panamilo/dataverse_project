require('dotenv').config()

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dataversedb',
  password: '123',
  port: 5432,
})

const getCategories = (request, response) => {
    pool.query('SELECT * FROM categories ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getCategoryById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM categories WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createCategory = async (request, response) => {
    const {name} = request.body
    if(name.length>50){
      response
      .status(400)
      .json({ status: false, message: "Name is too big" });
    }
    else {
    pool.query('INSERT INTO categories(name) VALUES ($1)', [name], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).json({status:true, message: "Category successfully added."})
    })
  }
}

  
  const deleteCategory = async (request, response) => {
    const id = parseInt(request.params.id)
    console.log(id)
    pool.query('DELETE FROM categories WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Category deleted with ID: ${id}`)
    })
  }
  const getArticles = (request, response) => {
    pool.query('SELECT articles.id,articles.category_id,articles.title,articles.description,articles.author,categories.name from articles inner join categories ON articles.category_id=categories.id ORDER BY articles.id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}
  const getArticleById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT articles.id,articles.category_id,articles.title,articles.description,articles.author,categories.name from articles inner join categories ON articles.category_id=categories.id WHERE articles.id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  const createArticle = (request, response) => {
    console.log(request)
    const { title,description, undefined,author} = request.body
    if(title.length>100){
      response
      .status(400)
      .json({ status: false, message: "Title is too big" });
    }
    else if(description.length>500){
      response
      .status(400)
      .json({ status: false, message: "Description is too big" });
    }
    else if(author.length>100){
      response
      .status(400)
      .json({ status: false, message: "Author name is too big" });
    }
    else {
    pool.query('INSERT INTO articles (title, description,category_id, author) VALUES ($1, $2 ,(SELECT id from categories where name=$3), $4)', [title, description, undefined,author], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: false,message: "Article successfully added."})
    })
  }
}
  const updateArticle = (request, response) => {
    const id = parseInt(request.params.id)
    const { title, description,author } = request.body
    if(title.length>100){
      response
      .status(400)
      .json({ status: false, message: "Title is too big" });
    }
    else if(description.length>500){
      response
      .status(400)
      .json({ status: false, message: "Description is too big" });
    }
    else if(author.length>100){
      response
      .status(400)
      .json({ status: false, message: "Author name is too big" });
    }
    else {
    pool.query(
      'UPDATE articles SET title = $1, description = $2, author=$3 WHERE id = $4',
      [title,description, author, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json({status: true,message: "Article successfully updated. "})
      }
    )
  }
}


  const deleteArticle = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM articles WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Article deleted with ID: ${id}`)
    })
  }

  module.exports = {
    getArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
    getCategories,
    getCategoryById,
    createCategory,
    deleteCategory
  }