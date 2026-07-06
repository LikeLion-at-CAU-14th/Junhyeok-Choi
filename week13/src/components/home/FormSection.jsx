import React from 'react'
import { ThemeColorContext } from '../../context/context'
import { Button, Card, Title, Wrapper } from '../layout/common';
import Form from './Form';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';


const FormSection = () => {
    const mode = useContext(ThemeColorContext);
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/mypage');
    }

  return (
    <Wrapper>
        <Card>
            <Title>회원 정보 입력</Title>
            <Form type='text' label='이름' />
            <Form type='email' label='이메일' />
            <Form type='date' label='생년월일' />
            <Form label='성별' />

            <Button
                mode={mode.button}
                onClick={handleSubmit}
            >
                제출하기
            </Button>
        </Card>
    </Wrapper>
  )
}

export default FormSection