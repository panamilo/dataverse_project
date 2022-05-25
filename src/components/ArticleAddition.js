import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";

const ArticleAddition = props => {
    const { handleInputChange, submitNewArticle, currentArticle } = props
    const title = currentArticle.title
    const description = currentArticle.description

    return (
        <form onSubmit={submitNewArticle}>
            <h3>Add a new Article</h3>
            <div className='form-group'>
            <label for="title">Title</label>
            <input
                type="text"
                id="title"
                className='form-control'
                placeholder="Lorem Ipsum"
                onChange={(e) => handleInputChange(e)}
                value={title}
            />
            </div>
            <div className='form-group'>
            <label for="description">Description</label>
            <textarea
                type="text"
                id="description"
                className='form-control'
                placeholder="Enter your article's description here."
                onChange={(e) => handleInputChange(e)}
                value={description}
            />
            </div>
            <div class="form-group">
    <label for="category_id">Example select</label>
    <select className="form-control" id="category_id">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
            
            <input type="submit" value="Submit"/>
            
        </form>
    )
   
}

export default ArticleAddition;