import { Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { ChangeEventHandler, FunctionComponent, MouseEventHandler, useState } from 'react';
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
  const [error, setError] = useState<{ username: boolean; password: boolean }>({
    username: false,
    password: false,
  });
  const router = useRouter();
  const inputOnChangeHander: ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'username':
        dispatch(signinActions.setUsername(event.target.value));
        break;
      case 'password':
        dispatch(signinActions.setPassword(event.target.value));
        break;
    }

    setError((state) => ({
      ...state,
      [event.target.name]: event.target.value === '',
    }));
  };

  const signinHandler: MouseEventHandler = async () => {
    try {
      const config: AxiosRequestConfig = {
        method: 'post',
        url: 'http://localhost:8080/signin',
        withCredentials: true,
        data: signinData,
      };
      await axios(config);
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

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
        ></TextField>
        <TextField
          css={textFieldStyle}
          variant="filled"
          type="password"
          name="password"
          label="password"
          onChange={inputOnChangeHander}
          error={error.password}
        ></TextField>
      </Stack>
      <Stack>
        <MuiButton onClick={signinHandler}>Sign In</MuiButton>
        <MuiButton
          type="white"
          onClick={() => {
            router.push('/sign-up');
          }}
        >
          Sign Up
        </MuiButton>
      </Stack>
    </AuthWrapper>
  );
};

export default SignIn;
