import './App.css';
import React from 'react';
import Quizes from './components/Quizes';
import QuizClass from './class/QuizClass';
import Quiz from './components/Quiz';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Solve from './components/Solve';
import AddQuiz from './components/AddQuiz';
import { Link, Outlet,useParams } from 'react-router-dom';
import Layout from './components/Layout';



export default function App() {
  return (
    <div>
      
      
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="quizes" element={<Quizes />} />
          <Route index element={<Quizes />} />
          <Route path="solve" element={<Solve />} />
          <Route path="add" element={<AddQuiz />} />
          <Route path="*" element={<Solve />} />
          <Route path="/quiz/:id" element={<Quiz />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}