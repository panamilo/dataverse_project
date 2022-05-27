import { AppBar, Toolbar, styled, Typography, InputBase, Button } from '@mui/material'
import React from 'react'
import { BookOnline } from '@mui/icons-material'
import { Link } from 'react-router-dom';

const StyledToolbar=styled(Toolbar)({
    display: "flex",
    justifyContent: "space-even"
})

const AppHeader = () => {
    return (
    <AppBar position='sticky'>
        <StyledToolbar>
            <Link to="/articles" className='App-link'>
            <img src='/dvlogo.png' alt='image'></img>
            </Link>
            <Link to="/articles" className='App-link'>
            <Button variant="span">Home</Button>
            </Link>
            <Link to="/articleAdd" className='App-link'>
            <Button variant="span">Create</Button>
            </Link>
            <Link to="/about" className="App-link">
            <Button variant="span">About</Button>
            </Link>
        </StyledToolbar>
    </AppBar>
    )
}

export default AppHeader