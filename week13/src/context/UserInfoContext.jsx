import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
    name: '',
    email: '',
    birth: '',
    gender: '',
};

function userInfoReducer(state, action) {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                [action.field]: action.value,
            };
        default:
            return state;
    }
}

export const UserInfoContext = createContext(null);

export const UserInfoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userInfoReducer, initialState);

    return (
        <UserInfoContext.Provider value={{ state, dispatch }}>
            {children}
        </UserInfoContext.Provider>
    );
};

export const useUserInfo = () => useContext(UserInfoContext);