import React from 'react'
import styled from 'styled-components'

const Header = () => {
  return (
    <HeaderContainer>
        <Avatar>
            <span>🎸</span>
        </Avatar>
        <Name>준혁</Name>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
  text-align: center;
`

const Avatar = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #fff7ed;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  span {
    font-size: 2.5rem;
  }
`

const Name = styled.h3`
  font-size: 1.3rem;
  font-weight: 800;
  color: #1f2937;
  margin: 0 0 8px;
`