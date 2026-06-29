import React from 'react'

const Quiz = () => {
  return (
    <div>Quiz Page</div>
  )
}

export default Quiz

const [questions, setQuestions] = useState([]);

useEffect(() => {
  const fetchQuestions = async () => {
    const response = await axios.get('https://week12-api-rcwo.onrender.com/api/questions');
    setQuestions(response.data);
  };
  fetchQuestions();
}, []);