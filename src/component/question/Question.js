import React, { useState, useEffect } from 'react'
import Button from '../btn/Button'
import "./question.css"

const Question = ({question, answers, answerSelected, correctAnswer, isChecked, ...props}) => {


    const getPaddingClass = (length) => {
        if(length > 11) {
            return "px-sm";
        } else if(length > 7) {
            return "px-md";
        } else {
            return "px-lg";
        }
    }

    return (
        <div className="question-wrap">
            <h2 className="question-question">{question}</h2>
            <div className="answer-wrap">
                {
                    answers.map((answer, index) => {                    

                        let pClass = getPaddingClass(answer.length)
                        let bClass = `btn btn-answer btn-sm-l 
                                ${pClass} 
                                ${isChecked ? "btn-answer--light" : ""}
                                ${!isChecked && answerSelected === answer ? "btn-answer--clicked" : ""}
                                ${isChecked && answer === correctAnswer ? "btn-answer--true" : ""}
                                ${isChecked && answerSelected === answer && answerSelected !== correctAnswer ? "btn-answer--false" : ""}`;

                        return (
                            <div key = {index} className="answer-item">
                                <Button 
                                    className={bClass}
                                    onClick = {() => props.onClick(question, answer)}
                                    >
                                    {answer}
                                </Button> 
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Question