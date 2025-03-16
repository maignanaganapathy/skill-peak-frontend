import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import QuizPage from './features/quiz/QuizAttending/AppContainer';

import QuizCreation from "./features/quiz/QuizCreation/QuizCreation";

import QuizList from "./features/quiz/QuizListing/QuizList";
import {NotificationManager} from "./features/Admin/Notification/NotificationManager"; // adjust the path if needed

function App() {
  return (
    <div>
      <NotificationManager />
    </div>
  );
}

export default App;


