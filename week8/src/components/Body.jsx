import React from 'react'
import styled from 'styled-components'

const Body = () => {
  return (
    <BodyContainer>
      <RoleBadge>프론트엔드</RoleBadge>
      <Bio>안녕하세요! 저는 최준혁입니다.</Bio>
    </BodyContainer>
  )
}

export default Body

const BodyContainer = styled.div`
  text-align: center;
  margin-top: 10px;
`

const RoleBadge = styled.span`
  display: inline-block;
  padding: 4px 16px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
  background: #fff7ed;
  color: #ea580c;
`

const Bio = styled.p`
  color: #6b7280;
  font-size: 0.9rem;
  margin: 14px 0 18px;
  line-height: 1.6;
`