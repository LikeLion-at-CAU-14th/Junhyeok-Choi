import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div className="flex flex-col items-center gap-[24px] p-[40px] w-full max-w-[600px]">
      <h1 className="text-[36px] text-[#535353] font-bold">📝 퀴즈</h1>
      {questions.map((q) => (
        <div key={q.id} className="bg-white rounded-[16px] p-[24px] w-full shadow-[2px_2px_8px_rgba(0,0,0,0.1)]">
          <p className="text-[18px] font-semibold text-[#333] mb-[16px]">{q.id + 1}. {q.question}</p>
          <div className="flex flex-col gap-[10px]">
            {q.answers.map((answer) => {
              const isSelected = userAnswers.find(a => a.id === q.id)?.answer === answer;
              return (
                <button
                  key={answer}
                  onClick={() => handleSelect(q.id, answer)}
                  className={`border-none outline-none rounded-[12px] px-[16px] py-[10px] text-[15px] cursor-pointer transition-colors duration-200 ease-in-out text-center ${
                    isSelected 
                      ? 'bg-[#75b5f5] text-white hover:bg-[#75b5f5]' 
                      : 'bg-[#e8f4fd] text-[#4a4a4a] hover:bg-[#b8edfb]'
                  }`}
                >
                  {answer}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <button
        disabled={userAnswers.length < questions.length}
        onClick={handleSubmit}
        className={`border-none outline-none rounded-[20px] px-[40px] py-[12px] text-[18px] font-bold transition-colors duration-200 ease-in-out ${
          userAnswers.length < questions.length
            ? 'bg-[#cccccc] text-white cursor-not-allowed hover:bg-[#cccccc]'
            : 'bg-[#75b5f5] text-white cursor-pointer hover:bg-[#9ecfff]'
        }`}
      >
        제출하기
      </button>
    </div>
  );
};

export default Quiz;