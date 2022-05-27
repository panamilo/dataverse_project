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
    InputLabel,
    Input
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


  const Sidebar = ({mode,setMode}) => {


  const [categories,setCategories] = useState([{name:'', description: ''}])
  const [newCategory,setCategory] = useState('')

    useEffect(()=> {
      fetch('http://localhost:8080/categories',
      {
        headers:
        {contentType : 'application/json'},
        method: 'GET',
        mode: 'cors'
      })
      .then((response) =>
      {
        console.log(response)
        return response.json()
      })
      .then((result)=> {
          console.log(result)
          setCategories(result)
      })

    },[]);

    const categoryList = categories.map((category) => {
      return (
        <ListItem disablePadding>
        <ListItemText primary={category.name} />
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <DeleteForever />
              </ListItemIcon>
              </ListItemButton>
          </ListItem>
      )
    })
    return (
      <form>
      <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
        <Box position="fixed">
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Categories
          </Typography>
          <List>
          {categoryList}
          </List>
          </Box>
          <FormControl>
                <InputLabel htmlFor="categoryname">Enter category name: </InputLabel>
                <Input
            id="categoryname"
            value={newCategory || ""}
            label="categoryname"
            size="small"
            />
            </FormControl>
          {/* <form onSubmit={console.log('dada')}>
              <FormControl>
                <InputLabel htmlFor="categoryname">Enter category name: </InputLabel>
                <Input
            id="categoryname"
            value={newCategory || ""}
            label="categoryname"
            size="small"
            >
            </Input>
          </FormControl>
          <Button type="submit" variant="contained">Add</Button>
          </form> */}
       
      </Box>
      </form>
    );
  
  };
  
  
  export default Sidebar;