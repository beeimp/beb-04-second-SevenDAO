import { ScopedCssBaseline } from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import SignIn from '../layouts/auth/SignIn';

const SignInPage: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SignIn></SignIn>
    </>
  );
};

export default SignInPage;
