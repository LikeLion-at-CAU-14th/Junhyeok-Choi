import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    <div>
      <h1>퀴즈 결과</h1>
      <h2>{resultMessage}</h2>
      <p>총 {score}개 정답!</p>
      <ul>
        {results.map((r) => (
          <li key={r.id}>
            {r.id + 1}번 문제: {r.correct ? '✅ 정답' : '❌ 오답'}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/quiz')}>다시 풀기</button>
      <button onClick={() => navigate('/')}>홈으로</button>
    </div>
  );
};

export default QuizResult;