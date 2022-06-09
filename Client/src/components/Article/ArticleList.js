import { Grid } from "@mui/material"
import React, {useState, useEffect}  from 'react';
import { ArticleCard } from "./ArticleCard";

const ArticleList = () => {

  const [articles,setArticles]= useState([{id: 0,name: '', author:'', category_id: 0,title: '', description: ''}])


  useEffect(()=> {
    fetch('/api/articles',
    {
      headers:
      {'Content-Type' : 'application/json'},
      method: 'GET',
    })
    .then((response) => response.json()
)
    .then((result)=> {
        console.log(result)
        setArticles(result)
    })

  },[]);


  const articleList  = articles.map((article)=>{
    return (
      <ArticleCard article={article} setArticles={setArticles}/>
    )
  })
        return(
          
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
              <>{articleList}</>           
          </Grid>
        )
        
}

export default ArticleList;