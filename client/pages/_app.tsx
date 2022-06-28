import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '../store/index';
import { useEffect } from 'react';
import Cookie from 'cookie';
import { authActions } from '../store/authSlice';
import { parseJwt, verifyJwt } from '../utils/jwt';
import { useDispatch } from 'react-redux';
import { removeCookies } from 'cookies-next';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const cookies = Cookie.parse(document.cookie ?? '');

    if (cookies?.jwt) {
      const token = cookies.jwt;
      const { username, iat } = parseJwt(token);
      if (verifyJwt(iat)) {
        removeCookies('jwt');
        router.push('/');
      }
      dispatch(authActions.successAuth(username));
    } else {
      dispatch(authActions.failureAuth('로그인이 필요합니다.'));
    }
  });
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
