import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';
import Quiz from './pages/Quiz';
import QuizResult from './pages/QuizResult';

const App = () => {
  return (
    <div className="flex w-full min-h-[95vh] flex-col justify-center items-center gap-[30px]">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books' element={<BookList />} >
          <Route path=':id' element={<BookDetail />} />
        </Route>
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/quiz/result' element={<QuizResult />} />

        

      </Routes>
    </div>
  )
}

export default App;