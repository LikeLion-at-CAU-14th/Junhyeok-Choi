import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import styled from 'styled-components';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';

const App = () => {
  return (
    <AppDom>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books' element={<BookList />} >
          <Route path=':id' element={<BookDetail />} />
        </Route>
        

      </Routes>
    </AppDom>
  )
}

export default App;

const AppDom = styled.div`
  display: flex;
  width: 100%;
  min-height: 95vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;