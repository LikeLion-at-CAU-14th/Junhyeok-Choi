import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    const sorted = [...userAnswers].sort((a, b) => a.id - b.id);
    const response = await axios.post('https://week12-api-rcwo.onrender.com/api/answers', {
      answers: sorted,
    });
    const score = response.data.results.filter(r => r.correct).length;
    navigate('/quiz/result', { state: { results: response.data.results, score } });
  };

  return (
    <Wrapper>
      <Title>📝 퀴즈</Title>
      {questions.map((q) => (
        <QuestionBox key={q.id}>
          <Question>{q.id + 1}. {q.question}</Question>
          <AnswerGroup>
            {q.answers.map((answer) => (
              <AnswerButton
                key={answer}
                selected={userAnswers.find(a => a.id === q.id)?.answer === answer}
                onClick={() => handleSelect(q.id, answer)}
              >
                {answer}
              </AnswerButton>
            ))}
          </AnswerGroup>
        </QuestionBox>
      ))}
      <SubmitButton
        disabled={userAnswers.length < questions.length}
        onClick={handleSubmit}
      >
        제출하기
      </SubmitButton>
    </Wrapper>
  );
};

export default Quiz;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 40px;
  width: 100%;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #535353;
  font-weight: 700;
`;

const QuestionBox = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
`;

const Question = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
`;

const AnswerGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AnswerButton = styled.button`
  all: unset;
  background-color: ${({ selected }) => (selected ? '#75b5f5' : '#e8f4fd')};
  color: ${({ selected }) => (selected ? '#ffffff' : '#4a4a4a')};
  border-radius: 12px;
  padding: 10px 16px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-align: center;

  &:hover {
    background-color: ${({ selected }) => (selected ? '#75b5f5' : '#b8edfb')};
  }
`;

const SubmitButton = styled.button`
  all: unset;
  background-color: ${({ disabled }) => (disabled ? '#cccccc' : '#75b5f5')};
  color: white;
  border-radius: 20px;
  padding: 12px 40px;
  font-size: 18px;
  font-weight: 700;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#cccccc' : '#9ecfff')};
  }
`;