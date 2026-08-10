import React , { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
    // [실습11] useParams로 파라미터 id 값 불러오기
    const params = useParams();
    const id = params.id;

    const [books, setBooks] = useState([]);

    // [실습 18] useEffect로 렌더링 될 때 한 번만 데이터 가져오기
    // [실습 17] public/database/books.json에 저장한 데이터를 axios로 불러오기
    useEffect(() => {
      const fetchBooks = async () => {
        const response = await axios.get("/databases/books.json");
        setBooks(response.data);
      }
      fetchBooks();
    }, [])

    const book = books.find((b) => b.id === parseInt(id));

    const [likes, setLikes] = useState(0);

    const updateLikes = () => {
        setLikes(likes + 1);
    };

    useEffect(() => {
        setLikes(0);
    }, [id])

    //예외처리
    if (!book) {
        return <div>찾는 책이 없습니다.</div>
    }

    return (
        <div>
            <h1 className="text-[32px] font-bold text-[#333] mb-[8px]">{book.title}</h1>
            <h3 className="text-[20px] font-semibold text-[#666] mb-[16px]">{book.author}</h3>
            <p className="text-[16px] text-[#444] mb-[20px] leading-relaxed">{book.description}</p>
            <button
                onClick={updateLikes}
                className="bg-[#75b5f5] text-white border-none rounded-[25px] px-[15px] py-[5px] text-[16px] cursor-pointer flex items-center justify-center transition-colors duration-300 ease-in-out hover:bg-[#9ecfff] active:bg-[#3d9dfd]"
            >
                <span className="mr-[8px] text-[20px]">👍</span> {likes}
            </button>
            
        </div>
    );
};

export default BookDetail;