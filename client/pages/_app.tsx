import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '../store/index';
import { useEffect, useState } from 'react';
import Cookie from 'cookie';
import { authActions } from '../store/authSlice';
import { parseJwt, verifyJwt } from '../utils/jwt';
import { useDispatch } from 'react-redux';
import { removeCookies } from 'cookies-next';
import Router, { useRouter } from 'next/router';
import Progress from '../components/Progress';

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const start = () => {
    setLoading(true);
  };
  const end = () => {
    setLoading(false);
  };

  useEffect(() => {
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

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

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, [dispatch, router]);
  return (
    <>
      {loading ? (
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
          }}
        >
          <Progress></Progress>
        </div>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default wrapper.withRedux(MyApp);
