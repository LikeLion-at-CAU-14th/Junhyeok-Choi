import React from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'

const App = () => {
  return (
    <Container>
      <CardBox>
        <Header />
        <Body />
        <Footer />
      </CardBox>
    </Container>
  )
}

export default App

const Container = styled.div`
  display: flex; 
  justify-content: center; 
  align-items: center; 
  min-height: 100vh; 
  background: #f9fafb;
`
const CardBox = styled.div`
  background: white; 
  border-radius: 20px; 
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`