import React ,{useState,useEffect} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {Button,TextField} from '@mui/material';
import {Link} from 'react-router-dom'

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
}));

export default function ArticleAdd() {
    const [categories,setCategories] = useState([{id: 0,name:'', description: ''}])
  const [newCategory,setCategory] = useState([])
  const [status,setStatus]=useState(false);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
        <List>
        {categoryList}
        </List>
        </Box>
        <Divider />
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Enter a new category: </label>
          <TextField value={newCategory.name || ''} onChange={handleChange} id="name" label=" Category Name" variant="standard" />
       <Button type="submit" variant="contained">Add</Button>
       </form>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
      </Main>
    </Box>
  );
}