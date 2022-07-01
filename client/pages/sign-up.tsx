import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SignUp from '../layouts/auth/SignUp';
import { RootState } from '../store';

const SignUpPage: NextPage = () => {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (auth.isAuth) {
      router.push('/');
    }
  });
  return (
    <>
      <SignUp></SignUp>
    </>
  );
};

export default SignUpPage;
