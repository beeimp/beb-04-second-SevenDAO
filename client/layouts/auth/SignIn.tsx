import { Button, Card, CardContent, CardMedia, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { textFieldStyle } from '../../styles/baseMui';
import AuthWrapper from '../../components/auth/wrapper';
import AuthWellComeCard from '../../components/auth/WellcomeCard';
import MuiButton from '../../components/mui/Button';

interface SignInProps {}

const SignIn: FunctionComponent<SignInProps> = () => {
  const router = useRouter();
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
        ></TextField>
        <TextField
          css={textFieldStyle}
          variant="filled"
          type="password"
          name="password"
          label="password"
        ></TextField>
      </Stack>
      <Stack>
        <MuiButton>Sign In</MuiButton>
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
