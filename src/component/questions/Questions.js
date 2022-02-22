import React, { Suspense, useEffect, useLayoutEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confetti from 'react-confetti';

import "./questions.css"
import useWindowSize from "../../utils/WindowSize"

import Question from '../question/Question'
import getData  from '../../data/FetchData'
import { API_QUESTIONS } from '../../utils/Constants'
import Button from '../btn/Button'
import Loading from '../loader/Loading';

const Questions = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answersSelected, setAnswersSelected] = useState(new Map());
  const [checked, setChecked] = useState(-1);
  const [correntQuestions, setcorrentQuestions] = useState(-1);

  const { width, height } = useWindowSize();

  useEffect(() => {
    setData();
  }, []);
  
  async function setData() {
    let data = await getData(API_QUESTIONS);
    setQuestions(data);
    setIsPlaying(true);
  }

  const chooseAnswer = (question, answer) => {
    if(answersSelected.get(question) === undefined || answersSelected.get(question) !== answer) {
      answersSelected.set(question, answer);
    } else {
      answersSelected.delete(question);
    }
    setAnswersSelected(new Map(answersSelected))
  }

  const checkAnwers = () => {
    if(answersSelected.size < questions.length) {
      toast.error("Please select full question!")
    } else {
      // toast.success('Checking!')
      setChecked(questions.length);
      getTheNumberOfCorrectAnswers();
    }
  }

  const playAgain = async () => {
    setIsPlaying(false);
    await setData();
    setChecked(-1)
    setAnswersSelected(new Map())
    setcorrentQuestions(-1)
  }; 

  const getTheNumberOfCorrectAnswers = () => {
    let count = 0;
    questions.forEach(q => {
      if(answersSelected.get(q.question) === q.correctAnswer) {
        count++;
      }
    })
    setcorrentQuestions(count);
  }

  const getAnswers = (question) => {
    let answers = [ ...question.incorrectAnswers ];
    answers.splice( question.posAnswer, 0, question.correctAnswer);
    return answers;
  }

  return <>
    {
      !isPlaying ? 
      <Loading /> 
      :
      <div className="questions-area">
        <div className="">
          { 
            questions.map((question, index) => {
              return <Question 
                key = {index} 
                question = {question.question}
                correctAnswer = {question.correctAnswer} 
                answers = {getAnswers(question)}
                answerSelected = {answersSelected.get(question.question)} 
                isChecked = {checked === questions.length}
                onClick = {chooseAnswer}/>
            }) 
          }
        </div>
        <div className="btn-area">
          {
            checked !== questions.length ? (
              <Button  className="btn btn-lg btn-br-md center" onClick={checkAnwers}>
                  Check answers
              </Button>) :
              <div className="btn-area--checked">
                <p>You scored {correntQuestions}/{questions.length} corrent answers</p>
                <Button  className="btn btn-lg btn-br-md" onClick={playAgain}>
                  Play again
                </Button>
              </div>
          }
        </div>
        <ToastContainer />
        {
          correntQuestions === questions.length ?
          <Confetti 
            width={width}
            height={height}
            recycle={false}
          /> : null
        }
      </div>
    }
  </>
}

export default Questions