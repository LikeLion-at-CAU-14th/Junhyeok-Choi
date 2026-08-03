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
    <div className="flex flex-col items-center gap-[20px] p-[40px] w-full max-w-[500px]">
      <h1 className="text-[36px] text-[#535353] font-bold">🏆 퀴즈 결과</h1>
      <h2 className="text-[24px] text-[#3d9dfd] font-bold">{resultMessage}</h2>
      <p className="text-[20px] text-[#555]">총 {score}개 정답!</p>
      <ul className="list-none p-0 w-full flex flex-col gap-[10px]">
        {results.map((r) => (
          <li
            key={r.id}
            className={`rounded-[12px] p-[12px_20px] text-[16px] font-semibold text-center ${
              r.correct 
                ? 'bg-[#e0f7ea] text-[#2e7d32]' 
                : 'bg-[#fdecea] text-[#c62828]'
            }`}
          >
            {r.id + 1}번 문제: {r.correct ? '✅ 정답' : '❌ 오답'}
          </li>
        ))}
      </ul>
      <div className="flex gap-[16px] mt-[10px]">
        <button
          onClick={() => navigate('/quiz')}
          className="border-none outline-none bg-[#b8edfb] text-[#4a4a4a] rounded-[16px] px-[28px] py-[12px] text-[16px] font-semibold cursor-pointer transition-colors duration-200 ease-in-out hover:bg-[#75b5f5] hover:text-white"
        >
          🔄 다시 풀기
        </button>
        <button
          onClick={() => navigate('/')}
          className="border-none outline-none bg-[#b8edfb] text-[#4a4a4a] rounded-[16px] px-[28px] py-[12px] text-[16px] font-semibold cursor-pointer transition-colors duration-200 ease-in-out hover:bg-[#75b5f5] hover:text-white"
        >
          🏡 홈으로
        </button>
      </div>
    </div>
  );
};

export default QuizResult;