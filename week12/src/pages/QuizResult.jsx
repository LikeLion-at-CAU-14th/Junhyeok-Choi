import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, results } = location.state;
  const [resultMessage, setResultMessage] = useState('');

  useEffect(() => {
    const fetchResult = async () => {
      const response = await axios.get(
        `https://week12-api-rcwo.onrender.com/api/result?score=${score}`
      );
      setResultMessage(response.data.message);
    };
    fetchResult();
  }, [score]);

  return (
    <Wrapper>
      <Title>🏆 퀴즈 결과</Title>
      <Message>{resultMessage}</Message>
      <Score>총 {score}개 정답!</Score>
      <ResultList>
        {results.map((r) => (
          <ResultItem key={r.id} correct={r.correct}>
            {r.id + 1}번 문제: {r.correct ? '✅ 정답' : '❌ 오답'}
          </ResultItem>
        ))}
      </ResultList>
      <ButtonGroup>
        <NavButton onClick={() => navigate('/quiz')}>🔄 다시 풀기</NavButton>
        <NavButton onClick={() => navigate('/')}>🏡 홈으로</NavButton>
      </ButtonGroup>
    </Wrapper>
  );
};

export default QuizResult;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px;
  width: 100%;
  max-width: 500px;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #535353;
  font-weight: 700;
`;

const Message = styled.h2`
  font-size: 24px;
  color: #3d9dfd;
  font-weight: 700;
`;

const Score = styled.p`
  font-size: 20px;
  color: #555;
`;

const ResultList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ResultItem = styled.li`
  background-color: ${({ correct }) => (correct ? '#e0f7ea' : '#fdecea')};
  color: ${({ correct }) => (correct ? '#2e7d32' : '#c62828')};
  border-radius: 12px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 10px;
`;

const NavButton = styled.button`
  all: unset;
  background-color: #b8edfb;
  color: #4a4a4a;
  border-radius: 16px;
  padding: 12px 28px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #75b5f5;
    color: white;
  }
`;