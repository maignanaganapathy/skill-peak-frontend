import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from "./theme"; // Your custom theme

import QuizList from "./features/quiz/QuizListing/QuizList";
import QuizCreation from "./features/quiz/QuizCreation/QuizCreation";
import QuizPage from './features/quiz/QuizAttending/AppContainer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<QuizList />} />
          <Route path="/create" element={<QuizCreation />} />
          <Route path="/quizattend" element={<QuizPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
