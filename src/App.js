import React, { useState, useEffect } from 'react';
import ArticleAddition from './components/ArticleAddition'
import CategoryAddition from './components/CategoryAddition'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Route, Switch } from 'react-router-dom'

const App = () => {

const initialFormState = {
  id:'',
  title:'',
  description: ''
}

const [articles,setArticles] =useState([])
const [currentArticle,setCurrentArticle]= useState(initialFormState)
const [editing,setEditing]= useState(false)


useEffect(()=> {
  fetchArticles();
}, [])

const fetchArticles = async () => {

const res = await fetch("http://localhost:8080/articles")
res.json()
.then(results=>{setArticles(results)})
.catch(e=>console.log(e))
}

const handleInputChange = event => {
  const { id, value } = event.target
  setCurrentArticle({ ...currentArticle, [id]: value })
}

const submitNewArticle = async (event) => {
  event.preventDefault()

  const response = await fetch(`http://localhost:8080/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(currentArticle),
  })
  response
    .json()
    .then(result => setArticles(result))
    .catch(e => console.log(e))

  fetchArticles()
  setCurrentArticle(initialFormState)
}

const deleteArticle = async (item) => {
  const response = await fetch(`http://localhost:8080/articles/${item.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  response
    .json()
    .then(result => setArticles(result), fetchArticles())
    .catch(e => console.log(e))
}


const editArticle = item => {
  console.log(item)
  setEditing(true)
  setCurrentArticle({ id: item.id, title: item.title, description: item.description, category_id: item.category_id})
}

const submitArticleEdit = async (event) => {
  event.preventDefault()

  const response = await fetch(`api/articles/${currentArticle.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(currentArticle),
  })
  response
  .json()
  .then(result => setArticles(result))
  .catch(e => console.log(e))

fetchArticles()
setCurrentArticle(initialFormState)
setEditing(false)

}

return (
  <div className="container">
    <h1>Dataverse CRUD Application</h1>
    <h5>A simple app to create, read, update and delete data with React, Express, Node, PostgreSQL</h5>

    <div className="flex-row">

      <div className="flex-large">
      <h3>List of current Articles</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(item =>
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>
                  <button onClick={() => editArticle(item)} className="muted-button" >Edit</button>
                  <button onClick={() => deleteArticle(item)} style={{ marginLeft: 5 }} className="muted-button" >Delete</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}

export default App;
