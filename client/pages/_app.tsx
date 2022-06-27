import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '../store/index';
import { useEffect } from 'react';
import Cookie from 'cookie';
import { authActions } from '../store/authSlice';
import { parseJwt } from '../utils/jwt';
import { useDispatch } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    const cookies = Cookie.parse(document.cookie ?? '');

    if (cookies?.jwt) {
      const token = cookies.jwt;
      const { username } = parseJwt(token);
      dispatch(authActions.successAuth(username));
    } else {
      dispatch(authActions.failureAuth('로그인이 필요합니다.'));
    }
  });
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
