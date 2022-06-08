import { Grid,styled,Paper,Card,Button } from "@mui/material"
import React, {useState, useEffect}  from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Link} from 'react-router-dom'
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