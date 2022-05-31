import { Box, Container, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import './App.css';
import AppHeader from './components/Bars/AppHeader';
import Sidebar from './components/Bars/Sidebar';
import Article from './components/Article/Article';
import ArticleAdd from './components/Article/ArticleAdd';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App()  {

  const navigate=useNavigate();

  useEffect(() => {
        navigate("/articles")
  },[]);

  return (
    <>
    <Box>
      <AppHeader />
     
    <Stack direction="row" spacing={2} justifyContent="space-between">
      
      </Stack>
      </Box>
      <Box>
      <Routes>
     <Route path="/articles" element={<Article />} />
      <Route path="/ArticleAdd" element={<ArticleAdd />} /> 
      </Routes>
      </Box>
    
    
    
    
    </>
  );
}

export default App;
