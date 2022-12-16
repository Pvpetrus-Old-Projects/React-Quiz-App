import './App.css';
import React from 'react';
import Quizes from './components/Quizes';
import QuizClass from './class/QuizClass';

export default function App() {
  const list = [
    new QuizClass(1,"Matematyka","1 mendel - ile to sztuk?",["60", "14", "7", "15"],4),
    new QuizClass(2,"Matematyka","Do jakich liczb przystaje (mod 8) kwadrat liczby naturalnej?",["5 lub 6", "2 lub 3", "1, 2 lub 7", "0, 1 lub 4"],4),
    new QuizClass(3,"Lektury","Dlaczego Wokulski, bohater \"Lalki\", miał czerwone dłonie?",["Zafarbował je","Odmroził je na Syberii","Z powodu choroby","Poparzył je w dzieciństwie"],2)
  ];
  return (
    <div>
      <Quizes quizes={list} />
    </div>
  );
}