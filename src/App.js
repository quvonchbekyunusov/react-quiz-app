import React, { useState, useEffect } from 'react';
import './App.css';
import Question from './components/Question';
import quizData from './data/quiz.json'
import Start from "./components/Start";
import End from './components/End';
import Modal from './components/Modal';
import Login from './components/Login';
import { shuffle } from './randomize.js';
import firebase from 'firebase/app'
import 'firebase/database';
import { insertionSort } from './sort'

let interval;

function App() {
  const [step, setStep] = useState(0)
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [time, setTime] = useState(0);
  const [name,  setName] = useState('');
  const [randomData, setRandomData] = useState([]);
  // eslint-disable-next-line
  const [randomQuiz, setRandomQuiz] =useState([]);
  const [fireData, steFireData] = useState([])
  const [sortData, setSortData] = useState([])
  const [leaderData, setLeaderData] = useState([])

  useEffect(() => {
    const db = firebase.database();
    const data = db.ref('leaderboard');
    data.on('value', (elem) => steFireData(elem.val()));
  }, [])

  useEffect(() => {
    setSortData(leaderData.sort((correct) => {
      return (a, b) => (a[correct] > b[correct]) ? 1 : ((b[correct] > a[correct]) ? -1 : 0)}))
    console.log(sortData)
    // eslint-disable-next-line
  }, [])


  const leaderboard = {
    name: '',
    correct: 0,
    time: '',
  }

  const handleLogin = () => {
    setRandomData(shuffle(quizData.data))
    setStep(1)
  }
  
  const onHandleChange = (event) => {
    setName(event.target.value)
  }

  const onQuit = () => {
    setRandomQuiz([])
    setActiveQuestion(0);
    setAnswers([]);
    setStep(0);
  }

  useEffect(() => {
    if(step === 3) {
      clearInterval(interval)
    }
  }, [step])
  useEffect(() => {
    if(step === 2) {
      setTime(0);
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000)
    }
  }, [step])

  const quizStartHandler = () => {
    randomData.forEach((quistion, index)=>{
      if(index<5) {
        randomQuiz.push(quistion)
      }
    })
    setStep(2)
  }

  
  const resetClickHandler = () => {
    setActiveQuestion(0);
    setAnswers([]);
    setStep(2);
  }

  
  return (
    <div className="App">
      {step===0 && <Login 
        handleLogin = {handleLogin}
        onHandleChange = {onHandleChange}
       />}
      {step===1 && <Start onQuizStart={quizStartHandler} />}
      {step===2 && <Question 
        data={randomQuiz[activeQuestion]}
        onAnswerUpdate={setAnswers}
        numberOfQuestions={randomQuiz.length}
        activeQuestion={activeQuestion}
        onSetActiveQuestion={setActiveQuestion}
        onSetStep={setStep}
      />}
      {step===3 && <End
        name={name}
        leaderboard = {leaderboard}
        results={answers}
        data={randomQuiz}
        onReset={resetClickHandler}
        onAnswersCheck={()=>setShowModal(true)}
        time={time}
        leaderData={leaderData}
        fireData={fireData}
        onQuit={onQuit}
       />}
      {showModal && <Modal
        results={answers}
        data={randomQuiz}
        onClose={()=>setShowModal(false)}
      />}
    </div>
  );
}

export default App;
