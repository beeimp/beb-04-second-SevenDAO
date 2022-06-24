import { ScopedCssBaseline } from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SignIn from '../layouts/auth/SignIn';
import { RootState } from '../store';

const SignInPage: NextPage = () => {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (auth.isAuth) {
      // router.push('/');
      router.back();
    }
  });
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
