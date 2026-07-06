import React from 'react'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import MyPage from './pages/MyPage'

const App = () => {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Layout>
  )
}
export default App
