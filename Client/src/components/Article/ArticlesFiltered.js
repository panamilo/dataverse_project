import { Grid } from "@mui/material"
import React, {useState, useEffect}  from 'react';
import { ArticleCard } from "./ArticleCard";
import { useParams } from "react-router-dom";

export default function ArticlesFiltered() {

    const params = useParams();
    const [articles,setArticles]= useState([{id: 0,name: '', author:'', category_id: 0,title: '', description: ''}])


    async function handleFilter(id){
        await fetch(`/api/articlesbycat/${id}`,{
          method: 'GET',
          headers:{
            Accept: 'application/json',
            'Content-Type':'application/json'
          },
        })
        .then((response) => response.json()
        )
        .then((result)=> {
            console.log(result)
            setArticles(result)
        })
      }


  useEffect(()=> {
   handleFilter(params.id)
  },[]);


  const articleListaki  = articles.map((article)=>{
    return (
      <ArticleCard article={article} setArticles={setArticles}/>
    )
  })
        return(
          
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
              <>{articleListaki}</>           
          </Grid>
        )
        
}
