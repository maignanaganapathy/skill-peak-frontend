import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import QuizPage from './features/quiz/QuizAttending/AppContainer';

import QuizCreation from "./features/quiz/QuizCreation/QuizCreation";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <QuizCreation />
    </div>
  );
}
