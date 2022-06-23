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

  const clickSignUpButton: MouseEventHandler = async () => {
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
      console.log(result);
      router.push('/');
    } catch (err) {
      alert(err);
    }
  };

  const [error, setError] = useState<{ username: boolean; email: boolean; password: boolean }>({
    username: false,
    email: false,
    password: false,
  });

  const inputOnChangeHandler: ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'username':
        dispatch(signupActions.setUsername(event.target.value));
        break;
      case 'email':
        dispatch(signupActions.setEmail(event.target.value));
        break;
      case 'password':
        dispatch(signupActions.setPassword(event.target.value));
        break;
    }
    setError((state) => ({
      ...state,
      [event.target.name]: event.target.value === '',
    }));
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
        ></TextField>
        <TextField
          variant="filled"
          css={textFieldStyle}
          type="email"
          name="email"
          label="email"
          onChange={inputOnChangeHandler}
          error={error.email}
        ></TextField>
        <TextField
          css={textFieldStyle}
          variant="filled"
          type="password"
          name="password"
          label="password"
          onChange={inputOnChangeHandler}
          error={error.password}
        ></TextField>
      </Stack>
      <Stack>
        <MuiButton onClick={clickSignUpButton}>Sign Up</MuiButton>
      </Stack>
    </AuthWrapper>
  );
};

export default SignUp;
