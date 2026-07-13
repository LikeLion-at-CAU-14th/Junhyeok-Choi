import React, { useState, useContext } from 'react'
import { ThemeColorContext } from '../../context/context'
import { Button, Card, Title, Wrapper } from '../layout/common';
import Form from './Form';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../context/UserInfoContext';

const FormSection = () => {
    const mode = useContext(ThemeColorContext);
    const navigate = useNavigate();
    const { dispatch } = useUserInfo();

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        birth: '',
        gender: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        dispatch({ type: 'SET_FIELD', field: 'name', value: formState.name });
        dispatch({ type: 'SET_FIELD', field: 'email', value: formState.email });
        dispatch({ type: 'SET_FIELD', field: 'birth', value: formState.birth });
        dispatch({ type: 'SET_FIELD', field: 'gender', value: formState.gender });
        navigate('/mypage');
    }

  return (
    <Wrapper>
        <Card>
            <Title>회원 정보 입력</Title>
            <Form
                type='text'
                label='이름'
                name='name'
                value={formState.name}
                onChange={handleChange}
            />
            <Form
                type='email'
                label='이메일'
                name='email'
                value={formState.email}
                onChange={handleChange}
            />
            <Form
                type='date'
                label='생년월일'
                name='birth'
                value={formState.birth}
                onChange={handleChange}
            />
            <Form
                label='성별'
                name='gender'
                value={formState.gender}
                onChange={handleChange}
            />

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