import { Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { textFieldStyle } from '../../styles/baseMui';
import AuthWrapper from '../../components/auth/wrapper';
import AuthWellComeCard from '../../components/auth/WellcomeCard';
import MuiButton from '../../components/mui/Button';

interface SignUpProps {}

const SignUp: FunctionComponent<SignUpProps> = () => {
  const router = useRouter();
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
        ></TextField>
        <TextField
          variant="filled"
          css={textFieldStyle}
          type="email"
          name="email"
          label="email"
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
        <MuiButton
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

export default SignUp;
