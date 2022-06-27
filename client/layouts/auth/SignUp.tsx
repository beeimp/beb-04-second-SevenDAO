import { Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { ChangeEventHandler, FunctionComponent, MouseEventHandler, useState } from 'react';
import { textFieldStyle } from '../../styles/baseMui';
import AuthWrapper from '../../components/auth/wrapper';
import AuthWellComeCard from '../../components/auth/WellcomeCard';
import MuiButton from '../../components/mui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { signupActions } from '../../store/signupSlice';
import { RootState } from '../../store';
import Axios from 'axios';

interface SignUpProps {}

const SignUp: FunctionComponent<SignUpProps> = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const signupData = useSelector((state: RootState) => state.signup);
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [error, setError] = useState<{
    username: boolean;
    email: boolean;
    password: boolean;
    passwordConfirm: boolean;
  }>({
    username: false,
    email: false,
    password: false,
    passwordConfirm: false,
  });
  const [errorMessage, setErrorMessage] = useState<{
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }>({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const clickSignUpButton: MouseEventHandler = async () => {
    if (signupData.email === '' && signupData.username === '' && signupData.password === '') {
      setError((state) => ({
        ...state,
        username: true,
        email: true,
        password: true,
        passwordConfirm: false,
      }));
      setErrorMessage((state) => ({
        ...state,
        username: 'username을 입력해주세요!',
        email: 'email을 입력해주세요!',
        password: 'password를 입력해주세요!',
      }));
      return;
    }
    try {
      const result = await Axios({
        method: 'post',
        url: 'http://localhost:8080/signup',
        // headers: {
        //   accept: 'application/json',
        // },
        withCredentials: true,
        data: signupData,
      });
      if (result.data.message === 'signup fail') throw new Error('username이 중복되었습니다!');
      router.push('/');
    } catch (err) {
      setError((state) => ({
        ...state,
        username: true,
      }));
      setErrorMessage((state) => ({
        ...state,
        username: 'username이 중복되었습니다!',
      }));
    }
  };

  const inputOnChangeHandler: ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError((state) => ({
      ...state,
      [event.target.name]: event.target.value === '',
    }));
    setErrorMessage((state) => ({
      ...state,
      [event.target.name]: event.target.value === '' ? '값을 입력해주세요!' : '',
    }));

    switch (event.target.name) {
      case 'username':
        dispatch(signupActions.setUsername(event.target.value));
        break;
      case 'email':
        const isEmail = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
          event.target.value
        );
        setError((state) => ({
          ...state,
          [event.target.name]: !isEmail,
        }));
        setErrorMessage((state) => ({
          ...state,
          [event.target.name]: !isEmail ? '이메일 양식을 맞춰주세요! ex) sdao@sevendao.com' : '',
        }));
        dispatch(signupActions.setEmail(event.target.value));
        break;
      case 'password':
        // 비밀번호 정규 표현식
        const isPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(event.target.value);
        setError((state) => ({
          ...state,
          [event.target.name]: !isPassword,
        }));
        setErrorMessage((state) => ({
          ...state,
          [event.target.name]: !isPassword ? '최소 8 자, 최소 하나의 문자 및 하나의 숫자 필요' : '',
        }));

        dispatch(signupActions.setPassword(event.target.value));
        break;
      case 'passwordConfirm':
        setPasswordConfirm(() => event.target.value);
        setError((state) => ({
          ...state,
          passwordConfirm: signupData.password !== event.target.value,
        }));
        setErrorMessage((state) => ({
          ...state,
          passwordConfirm:
            signupData.password !== event.target.value ? 'password가 일치하지 않습니다!' : '',
        }));

        break;
    }
  };

  return (
    <AuthWrapper>
      <AuthWellComeCard
        title="Nice to meet you!"
        message="Wellcome come to our SevenDAO!"
      ></AuthWellComeCard>
      <Stack>
        <TextField
          variant="filled"
          css={textFieldStyle}
          type="text"
          name="username"
          label="username"
          onChange={inputOnChangeHandler}
          error={error.username}
          helperText={errorMessage.username}
        ></TextField>
        <TextField
          css={textFieldStyle}
          variant="filled"
          type="password"
          name="password"
          label="password"
          onChange={inputOnChangeHandler}
          error={error.password}
          helperText={errorMessage.password}
        ></TextField>
        <TextField
          css={textFieldStyle}
          variant="filled"
          type="password"
          name="passwordConfirm"
          label="password 확인"
          onChange={inputOnChangeHandler}
          error={error.passwordConfirm}
          helperText={errorMessage.passwordConfirm}
        ></TextField>
        <TextField
          variant="filled"
          css={textFieldStyle}
          type="email"
          name="email"
          label="email"
          onChange={inputOnChangeHandler}
          error={error.email}
          helperText={errorMessage.email}
        ></TextField>
      </Stack>
      <Stack>
        <MuiButton onClick={clickSignUpButton}>Sign Up</MuiButton>
      </Stack>
    </AuthWrapper>
  );
};

export default SignUp;
