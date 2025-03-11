import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import QuizPage from './features/quiz/QuizAttending/AppContainer';

import QuizCreation from "./features/quiz/QuizCreation/QuizCreation";

import QuizListPage from "./features/quiz/QuizListing/QuizListPage"; // adjust the path if needed

function App() {
  return (
    <div>
      <QuizListPage />
    </div>
  );
}

export default App;


