import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get('https://week12-api-rcwo.onrender.com/api/questions');
      setQuestions(response.data);
    };
    fetchQuestions();
  }, []);

  const handleSelect = (questionId, answer) => {
    setUserAnswers(prev => {
      const filtered = prev.filter(a => a.id !== questionId);
      return [...filtered, { id: questionId, answer }];
    });
  };

  return (
    <div>
      {questions.map((q) => (
        <div key={q.id}>
          <p>{q.question}</p>
          {q.answers.map((answer) => (
            <button
              key={answer}
              onClick={() => handleSelect(q.id, answer)}
              style={{
                backgroundColor: userAnswers.find(a => a.id === q.id)?.answer === answer
                  ? '#75b5f5'
                  : '',
              }}
            >
              {answer}
            </button>
          ))}
        </div>
      ))}
      <button
        disabled={userAnswers.length < questions.length}
        onClick={() => alert('제출!')}
      >
        제출하기
      </button>
    </div>
  );
};

export default Quiz;