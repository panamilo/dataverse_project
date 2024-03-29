import React ,{useState,useEffect} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {Button,TextField} from '@mui/material';
import {Link} from 'react-router-dom'



export default function ArticleAdd() {

  const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  backgroundColor: '#ffffff',
}));

    const [categories,setCategories] = useState([{id: 0,name:'', description: ''}])
  const [newCategory,setCategory] = useState([])
  const [status,setStatus]=useState(false);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleChange(e){
    setCategory({...newCategory,[e.target.id]:e.target.value});
}

  async function handleDelete(id){
    await fetch(`/api/category/${id}`,{
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
      await fetch('/api/categories/new',
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
    fetch('/api/categories',
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const categoryList = categories.map((category) => {
    return (
      <ListItem disablePadding>
        <ListItemText>
      <Link to={"/articlesbycat/" + category.id}> {category.name} </Link>
      </ListItemText>
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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{display : {xs:"none",sm:"block"}}}>
          <Link to="/articles" className='App-link'>
            <img src='/dvlogo.png' alt='' ></img>
            </Link>
            </Box>
            <Link to="/articles" className='App-link'>
            <Button variant="span" >Home</Button>
            </Link>
            <Link to="/articleAdd" className='App-link'>
            <Button variant="span">Create</Button>
            </Link>
            <Link to="/about" className="App-link">
            <Button variant="span">About</Button>
            </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            color: 'primary'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box>
        <List  sx={{m: 2}}>
        {categoryList}
        </List>
        </Box>
        <Divider />
        <Box  sx={{m: 2}}>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Enter a new category: </label>
          <TextField value={newCategory.name || ''} onChange={handleChange} id="name" label=" Category Name" variant="standard" />
       <Button type="submit" variant="contained">Add</Button>
       </form>
       </Box>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}