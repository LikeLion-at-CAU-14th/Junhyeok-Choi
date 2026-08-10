import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookList = () => {
    // books: 책 목록 상태 변수 (초기값 빈 배열), setBooks로 값 변경 시 화면 자동 재랜더링
    const [books, setBooks] = useState([]);
    
    //useNavigate 훅으로 페이지 이동 함수 가져오기
    const navigate = useNavigate();
     
    // 홈("/")으로 이동하는 함수 - Title 클릭 시 호출됨
    const goHome = () => {
      navigate("/")
    }

    useEffect(() => {
      const fetchBooks = async () => {
        const response = await axios.get("/databases/books.json");
        setBooks(response.data);
      }
      fetchBooks();
    }, [])

  return (
    <div className="flex justify-start items-center gap-[20px] w-full h-[80vh] m-[20px]">
      <div className="flex flex-col justify-start bg-white p-[50px] h-[80%] rounded-r-[10px] shadow-[2px_2px_5px_rgba(0,0,0,0.1)]">
        <div onClick={goHome} className="text-[40px] text-[#535353] font-bold cursor-pointer">🏡</div>
        <div className="text-[40px] text-[#535353] font-bold mb-[20px]">🦁Book List🦁</div>
        <ul className="list-disc pl-[20px] flex flex-col gap-[12px]">
          {/* [실습 12] id와 매치되는 책 정보 링크로 연결*/}
          {books.map((book) => (
            <Link key={book.id} to={`/books/${book.id}`} className="no-underline text-[#4a4a4a] hover:text-[#75b5f5] transition-colors">
              <li className="text-[18px] font-medium cursor-pointer">{book.title}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex flex-col justify-start items-center p-[50px] h-full rounded-r-[10px] mt-[100px]">
        <Outlet />
      </div>
    </div>
  );
};

export default BookList;