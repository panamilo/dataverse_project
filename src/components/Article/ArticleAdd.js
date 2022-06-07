import React, { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Input, TextField, Button, Select, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export default function ArticleAdd() {

  const navigate = useNavigate()

  const emptyArticle = {

    id: 0,
    category_id: 0,
    title: '',
    description: '',
    name: '',
    author: ''
  }

  const [newArticle, setArticle] = useState([emptyArticle])
  const [categories, setCategories] = useState([{ id: 0, name: '', description: '' }])

  function handleChange(e) {
    setArticle({ ...newArticle, [e.target.id]: e.target.value });
  }
  useEffect(() => {
    fetch('http://localhost:8080/categories',
      {
        headers:
          { 'Content-Type': 'application/json' },
        method: 'GET',
      })
      .then((response) => response.json()
      )
      .then((result) => {
        setCategories(result)
      })

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newArticle.title == '' || newArticle.description == '' || newArticle.name == '' || newArticle.author == '') {
      alert("Please complete the fields first");
      return;
    }
    else {
      await fetch(`http://localhost:8080/article/new`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArticle),
      })
        .then((response) => response.json())

        .then((data) => {
          alert(data.message)
          if (data.status) {
            navigate('/articles')
          }
        })
    }
  }

  const categoriesList = categories.map((category) => {
    return (
      <MenuItem name='name' id='name' key={category.name} value={category.name}>{category.name}</MenuItem>
    )
  })

  return (

    <div>
      <h1 style={{ textAlign: "center", font: 14 }}>Add a new Article</h1>
      <form onSubmit={handleSubmit}>
        <Box
          m="auto"
          sx={{
            width: 200,
            height: 400,
          }}
        >
          <div>
            <FormControl margin="normal">
              <InputLabel htmlFor="title">Enter Title: </InputLabel>
              <Input
                id="title"
                multiline
                value={newArticle.title || ""}
                onChange={handleChange}
                label="title"
                variant='outlined'
                size='large'
              />
            </FormControl>
            <FormControl margin="normal">
              <InputLabel htmlFor="description">Enter Description:</InputLabel>
              <Input
                id="description"
                multiline
                value={newArticle.description || ""}
                onChange={handleChange}
                label="description"
                variant="filled"
              />
            </FormControl>
            <FormControl margin="normal">
              <InputLabel htmlFor="author">Enter Author's name: </InputLabel>
              <Input
                id="author"
                label="author"
                value={newArticle.author || ""}
                onChange={handleChange}
                size="small"
                variant='outlined'
              />
            </FormControl>
            <FormControl margin="normal">
              <InputLabel htmlFor='name'>Category</InputLabel>
              <Select
                id="name"
                labelId="name"
                autoWidth
                value={newArticle.name}
                defaultValue=""
                style={{ width: 200 }}
                onChange={handleChange}
              >
                {categoriesList}
              </Select>
            </FormControl>


          </div>

          <Button
            type=""
            style={{ marginRight: 38 }}
            variant="contained"
            color="primary"
            onClick={(e) => handleSubmit(e)}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              navigate("/articles");
            }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </div>

  )
}
