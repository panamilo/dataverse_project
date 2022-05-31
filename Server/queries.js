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
    pool.query('INSERT INTO categories(name) VALUES ($1)', [name], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).json({status:true, message: "Category successfully added."})
    })
  }

  
  const deleteCategory = async (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM categories WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Category deleted with ID: ${id}`)
    })
  }

const getArticles = (request, response) => {
  pool.query('SELECT * FROM articles ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
  const getArticleById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM articles WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  const createArticle = (request, response) => {
    const { title,description, category_id} = request.body
  
    pool.query('INSERT INTO articles (title, description, category_id) VALUES ($1, $2 , $3)', [title, description, category_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Article added with ID: ${results.insertId}`)
    })
  }
  const updateArticle = (request, response) => {
    const id = parseInt(request.params.id)
    const { title, description, category_id } = request.body
  
    pool.query(
      'UPDATE articles SET title = $1, description = $2, category_id=$3 WHERE id = $4',
      [title,description, category_id, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Article modified with ID: ${id}`)
      }
    )
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