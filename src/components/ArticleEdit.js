import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";


const ArticleEdit = props => {

    const { handleInputChange, submitArticleEdit, currentArticle, handleCheckboxChange } = props
    const title = currentArticle.title
    const description = currentArticle.description
    const category_id = currentArticle.category_id
    return (
        <form onSubmit={submitArticleEdit}>
            <h3>Edit this Article</h3>
            <div className='form-group'>
            <label for="title">Title</label>
            <input
                type="text"
                id="title"
                className='form-control'
                onChange={handleInputChange}
                value={title}
            />
            </div>
            <div className='form-group'>
            <label for="description">Description</label>
            <textarea
                id="description"
                className='form-control'
                onChange={handleInputChange}
                value={description}
            />
            </div>
            <input type="submit" value="Submit"/>
        </form>
    )
}

export default ArticleEdit;