import {
    DeleteForever
  } from "@mui/icons-material";
  import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    TextField,
    Button,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


  const Sidebar = ({mode,setMode}) => {

  
    const navigate=useNavigate();

  const [categories,setCategories] = useState([{name:'', description: ''}])
  const [newCategory,setCategory] = useState([])

  function handleChange(e){
      setCategory({...newCategory,[e.target.id]:e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(newCategory=='')
    {
      alert("Please fill in the category name first");
      return ;
    }
    else{
      console.log(newCategory.name)
      await fetch('http://localhost:8080/categories/new',
      {
        method:'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(newCategory),
       
      })
      .then((response) => response.json())
      .then((data) => {
       alert(data.message)
       if (data.status) {
        navigate("/articles");
      }
       
      })
    }
  }
  

    useEffect(()=> {
      fetch('http://localhost:8080/categories',
      {
        headers:
        {'Content-Type' : 'application/json'},
        method: 'GET',
      })
      .then((response) => response.json()
)
      .then((result)=> {
          console.log(result)
          setCategories(result)
      })

    },[]);

    const categoryList = categories.map((category) => {
      return (
        <ListItem disablePadding>
        <ListItemText primary={category.name} />
            <Button variant="outlined" color="error">DELETE
              </Button>
          </ListItem>
      )
    })
    return (
      <Box display="fixed" flex={1} p={2} >
        <Box position="fixed">
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Categories
          </Typography>
          <List>
          {categoryList}
          </List>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Enter a new category: </label>
          <TextField value={newCategory.name || ''} onChange={handleChange} id="name" label=" Category Name" variant="standard" />
       <Button type="submit" variant="contained">Add</Button>
       </form>
          </Box>     
      </Box>
    );
  
  };
  
  
  export default Sidebar;