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

const ArticleList = () => {

  const [articles,setArticles]= useState([{id: 0,name: '', author:'', category_id: 0,title: '', description: ''}])

  async function handleDelete(id){
    await fetch(`http://localhost:8080/article/${id}`,{
      method: 'DELETE',
      headers:{
        Accept: 'application/json',
        'Content-Type':'application/json'
      },
    })
    .then(()=> {
    let updatedArticles = [...articles].filter((i)=> i.id !== id);
    setArticles(updatedArticles);
    })
  }

  useEffect(()=> {
    fetch('http://localhost:8080/articles',
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

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
    
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  const articleList  = articles.map((article)=>{
    return (
    <Grid item xs={6} md={4}>
    <Item><Card >
<CardHeader
avatar={
<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
  D
</Avatar>
}
title={article.title}
subheader={article.name}
/>
<CardMedia
component="img"
height="194"
image="/dvlogo.png"
alt="article logo"
/>
<CardContent>
<Typography variant="body2" color="text.secondary">
Αρθρογράφος: {article.author}
</Typography>
</CardContent>
<CardActions disableSpacing>
<Link to={"/article/" + article.id} className='App-link'>
<Button variant="outlined">EDIT</Button>
</Link>
<Button variant="outlined" color="error" sx={{m: 2}} onClick={()=> {
  console.log(article.id)
  handleDelete(article.id)}}>DELETE</Button>
<ExpandMore
expand={expanded}
onClick={handleExpandClick}
aria-expanded={expanded}
aria-label="show more"
>
<ExpandMoreIcon />
</ExpandMore>
</CardActions>
<Collapse in={expanded} timeout="auto" unmountOnExit>
<CardContent>
<Typography paragraph>
 {article.description}
</Typography>
</CardContent>
</Collapse>
</Card></Item>
  </Grid>
    )
  })
        return(
          
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
              <>{articleList}</>           
          </Grid>
        )
        
}

export default ArticleList;