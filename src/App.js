import { Box, Stack } from '@mui/material';
import React, {useEffect } from 'react';
import './App.css';
import AppHeader from './components/Bars/AppHeader';
import ArticleList from './components/Article/ArticleList';
import ArticleAdd from './components/Article/ArticleAdd';
import ArticleEdit from './components/Article/ArticleEdit';
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
     <Route path="/articles" element={<ArticleList />} />
     <Route path="/articleAdd" element={<ArticleAdd />} />
     <Route path="/article/:id" element={<ArticleEdit />} />
      </Routes>
      </Box>
    
    
    
    
    </>
  );
}

export default App;
