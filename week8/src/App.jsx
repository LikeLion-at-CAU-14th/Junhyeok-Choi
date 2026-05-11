import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; 
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import Contact from './pages/Contact';

function App() {
    return (
        <Router>
            {/* 상단 네비게이션은 항상 고정 */}
            <Navbar />
            
            {/* 경로에 따라 바뀌는 메인 화면 */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/aboutme" element={<AboutMe />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
    );
}

export default App;