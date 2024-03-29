import './App.css';
import React from 'react';
import Quizes from './components/Quizes';
import Quiz from './components/Quiz';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Solve from './components/Solve';
import AddQuiz from './components/AddQuiz';
import Layout from './components/Layout';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-notifications/lib/notifications.css'
import * as QuizesApi from './api/QuizesApi'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  addQuiz = (s) => {
    var body = {
    index_nr: s.index_nr,
    category: s.category,
    question: s.question,
    answers: [s.answer1, s.answer2, s.answer3, s.answer4],
    right_answer_index: parseInt(s.right_answer_index)
    }
    QuizesApi.addQuiz(body)
  }

  render() {
    return (
      <div>
        
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="quizes" element={<Quizes />} />
            <Route index element={<Quizes />} />
            <Route path="solve" element={<Solve />} />
            <Route path="add" element={<AddQuiz addQuiz={this.addQuiz}/>} />
            <Route path="*" element={<Solve />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </div>
    );
  }
}

export default App
