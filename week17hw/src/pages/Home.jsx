import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-[20px] w-full m-[20px]">
        <div className="text-[40px] text-[#535353] font-bold">12주차 실습</div>
        <Link 
          to="/books" 
          className="flex justify-center items-center w-[300px] h-[100px] text-[25px] text-[#4a4a4a] bg-[#b8edfb] rounded-[20px] cursor-pointer no-underline font-medium shadow-[2px_2px_5px_rgba(0,0,0,0.1)]"
        >
          📕 Book List
        </Link>
        <Link 
          to="/quiz" 
          className="flex justify-center items-center w-[300px] h-[100px] text-[25px] text-[#4a4a4a] bg-[#b8edfb] rounded-[20px] cursor-pointer no-underline font-medium shadow-[2px_2px_5px_rgba(0,0,0,0.1)]"
        >
          📝 Quiz
        </Link>
      </div>
    </div>
  )
}

export default Home