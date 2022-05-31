import {
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
    TextField,
    Button,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";


  const Sidebar = ({mode,setMode}) => {

  const [categories,setCategories] = useState([{id: 0,name:'', description: ''}])
  const [newCategory,setCategory] = useState([])
  const [status,setStatus]=useState(false);

  function handleChange(e){
      setCategory({...newCategory,[e.target.id]:e.target.value});
  }
  async function handleDelete(id){
    await fetch(`http://localhost:8080/category/${id}`,{
      method: 'DELETE',
      headers:{
        Accept: 'application/json',
        'Content-Type':'application/json'
      },
    })
    .then(()=> {
    let updatedCategories = [...categories].filter((i)=> i.id !== id);
    setCategories(updatedCategories);
    alert("Category successfully deleted.")
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(newCategory=='')
    {
      alert("Please fill in the category name first");
      return ;
    }

    else {
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
        setStatus(true);
        setCategory({
          name: ''
        })
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
          setStatus(false);
      })

    },[status]);

    const categoryList = categories.map((category) => {
      return (
        <ListItem disablePadding>
        <ListItemText primary={category.name} />
            <Button variant="outlined" color="error" onClick={()=>
              {
                console.log(category.id);
                handleDelete(category.id);
            }}>DELETE
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