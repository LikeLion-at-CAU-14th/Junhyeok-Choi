import React from 'react'
import { Card, Title, Wrapper } from '../components/layout/common';
import { useUserInfo } from '../context/UserInfoContext';

const MyPage = () => {
  const { state } = useUserInfo();

  return (
    <Wrapper>
      <Card>
        <Title>내 정보</Title>
        <p>이름: {state.name}</p>
        <p>이메일: {state.email}</p>
        <p>생년월일: {state.birth}</p>
        <p>성별: {state.gender}</p>
      </Card>
    </Wrapper>
  )
}

export default MyPage