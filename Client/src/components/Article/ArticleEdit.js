import React ,{useState,useEffect} from 'react';
import {Box,  FormControl, InputLabel,Input,Button,Select,MenuItem} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';

export default function ArticleEdit() {

   const navigate= useNavigate()

   const emptyArticle = {

      id: 0,
      category_id : 0,
      title : '',
      description : '',
      name : '',
      author: ''
   }
   const params = useParams();
   const [article,setArticle] = useState([emptyArticle])

   function handleChange(e){
      setArticle({...article,[e.target.id]:e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      article.title == "" ||
      article.description == "" ||
      article.author == ""
    ) {
      alert("Be sure you completed the fields first");
    } else {
      await fetch(`/api/article/${article.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(article),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message)
          if(data.status){
        navigate("/articles")}
        });
    }
  };


  function getArticleById(id) {
    fetch(`/api/article/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result)
        setArticle(result[0]);
        console.log(article);
      });
  }

  useEffect(()=> {
      getArticleById(params.id)
 },[article.id]);


 
   return (

<div>
      <h1 style={{ textAlign: "center", font: 14 }}>
        You are editing {article.title} 
      </h1>
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
              <InputLabel htmlFor="title">Enter Title:</InputLabel>
              <Input
                id="title"
                value={article.title || ""}
                onChange={handleChange}
                label="title"
                size="small"
              />
            </FormControl>
            <FormControl margin="normal">
              <InputLabel htmlFor="description">Enter Description:</InputLabel>
              <Input
                id="description"
                value={article.description || ""}
                onChange={handleChange}
                label="description"
                size="small"
              />
            </FormControl>
            <FormControl margin="normal">
              <InputLabel htmlFor="author">Enter Author's name: </InputLabel>
              <Input
                id="author"
                label="author"
                value={article.author || ""}
                onChange={handleChange}
                size="small"
                variant='outlined'
              />
            </FormControl>

          </div>

          <Button
            type="submit"
            style={{ marginRight: 38 }}
            variant="contained"
            color="primary"
            onClick={(e)=>handleSubmit(e)}
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
  );
}
