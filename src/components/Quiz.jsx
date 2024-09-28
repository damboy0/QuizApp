import React, { useState } from 'react';
import { quizData } from './data';

const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [click, setClick] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quizData;
  const { question, choices, correctAnswer } = questions[activeQuestion];

  const onSelectAnswer = (answer, index) => {
    setSelectedAnswerIndex(index);
    setClick(click + 1);

    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const onClickNextButton = () => {
    // Update result based on selected answer
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 2,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

   
    if (activeQuestion + 1 < questions.length) {
      
      setActiveQuestion(activeQuestion + 1);
    } else {
      
      alert(`Quiz completed! Your score: ${result.score + (selectedAnswer ? 2 : 0)}. 
      Correct Answers: ${result.correctAnswers + (selectedAnswer ? 1 : 0)} 
      Wrong Answers: ${result.wrongAnswers + (!selectedAnswer ? 1 : 0)}`);
      
     
      setTimeout(() => {
        window.location.reload();
      }, 2000); // 
    }

    
    setClick(0);
    setSelectedAnswerIndex(null);
  };

  const onClickPreviousButton = () => {
    
    if (activeQuestion > 0) {
      setActiveQuestion(activeQuestion - 1);
    }


    setClick(0);
    setSelectedAnswerIndex(null);
  };

  return (
    <>
      <div>
        <h2>{question}</h2>
        <ul>
          {choices.map((answer, index) => (
            <li
              key={answer}
              onClick={() => onSelectAnswer(answer, index)}
              style={{
                backgroundColor: selectedAnswerIndex === index ? 'lightgray' : '',
                cursor: 'pointer',
              }}
            >
              {answer}
            </li>
          ))}
        </ul>

        <div>
         
          {activeQuestion > 0 && (
            <button
              onClick={onClickPreviousButton}
              style={{
                marginRight: '10px',
              }}
            >
              Previous
            </button>
          )}

          
          <button onClick={onClickNextButton}>Next</button>
        </div>
      </div>
    </>
  );
};

export default Quiz;
