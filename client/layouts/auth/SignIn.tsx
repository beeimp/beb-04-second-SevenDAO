import { css, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { ChangeEventHandler, FunctionComponent, useState } from 'react';
import { textFieldStyle } from '../../styles/baseMui';
import AuthWrapper from '../../components/auth/wrapper';
import AuthWellComeCard from '../../components/auth/WellcomeCard';
import MuiButton from '../../components/mui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { signinActions } from '../../store/signinSlice';
import { RootState } from '../../store';
import axios, { AxiosRequestConfig } from 'axios';

interface SignInProps {}

const SignIn: FunctionComponent<SignInProps> = () => {
  const dispatch = useDispatch();
  const signinData = useSelector((state: RootState) => state.signin);
  const [error, setError] = useState<{ username: boolean; password: boolean; response: boolean }>({
    username: false,
    password: false,
    response: false,
  });
  const [errorMessage, setErrorMessage] = useState<{
    username: string;
    password: string;
  }>({
    username: '',
    password: '',
  });
  const router = useRouter();

  const inputOnChangeHander: ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError((state) => ({
      ...state,
      response: false,
    }));
    setError((state) => ({
      ...state,
      [event.target.name]: event.target.value === '',
    }));
    setErrorMessage((state) => ({
      ...state,
      [event.target.name]: event.target.value === '' ? `${event.target.name}을 입력해주세요!` : '',
    }));
    switch (event.target.name) {
      case 'username':
        dispatch(signinActions.setUsername(event.target.value));
        break;
      case 'password':
        dispatch(signinActions.setPassword(event.target.value));
        break;
    }
  };

  const signinHandler = async () => {
    try {
      const config: AxiosRequestConfig = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/signin`,
        withCredentials: true,
        data: signinData,
      };
      const res = await axios(config);
      if (res.data.message === 'login fail')
        throw new Error('username/password가 일치하지 않습니다!');
      router.push('/');
    } catch (err) {
      setError((state) => ({
        ...state,
        response: true,
      }));
    }
  };

  const errorStyle = css`
    text-align: center;
    color: red;
  `;

  return (
    <AuthWrapper>
      <AuthWellComeCard
        title="Hello Again!"
        message="Wellcom back you've been missed!"
      ></AuthWellComeCard>
      <Stack>
        <TextField
          variant="filled"
          css={textFieldStyle}
          type="text"
          name="username"
          label="username"
          onChange={inputOnChangeHander}
          error={error.username}
          helperText={errorMessage.username}
        ></TextField>
        <TextField
          css={textFieldStyle}
          variant="filled"
          type="password"
          name="password"
          label="password"
          onChange={inputOnChangeHander}
          onKeyDown={async (event) => {
            if (event.code === 'Enter') {
              await signinHandler();
            }
          }}
          error={error.password}
          helperText={errorMessage.password}
        ></TextField>
      </Stack>
      <Stack>
        <MuiButton
          onClick={async () => {
            await signinHandler();
          }}
        >
          Sign In
        </MuiButton>
        <MuiButton
          type="white"
          onClick={() => {
            router.push('/sign-up');
          }}
        >
          Sign Up
        </MuiButton>
        {error.response ? (
          <div css={errorStyle}>username/password가 일치하지 않습니다!</div>
        ) : undefined}
      </Stack>
    </AuthWrapper>
  );
};

export default SignIn;
