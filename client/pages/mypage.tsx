import { css } from '@emotion/react';
import axios, { AxiosRequestConfig } from 'axios';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import About from '../layouts/About';
import Header from '../layouts/Header';
import { RootState } from '../store';
import { CommentType, WroteCommetType } from '../types/comment';
import { PostType } from '../types/post';
import { parseJwt } from '../utils/jwt';

interface MyPageProps {
  userInfo: { username: string; email: string };
  balance: number;
  wrotePost: PostType[];
  wroteComments: WroteCommetType[];
}

const MyPage: NextPage<MyPageProps> = ({ userInfo, balance, wrotePost, wroteComments }) => {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);

  const wrapperStyle = css`
    display: flex;
  `;
  useEffect(() => {
    if (!auth.isAuth) {
      router.push('/sign-in');
      // router.back();
    }
  });

  return (
    <div css={wrapperStyle}>
      <Header></Header>
      <About
        userInfo={userInfo}
        balance={balance}
        wrotePost={wrotePost}
        wroteComments={wroteComments}
      ></About>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let userInfo: { username: string; email: string } = {
    username: '',
    email: 'sdao@sevendao.com',
  };
  let balance: number = 1;
  let wrotePost: PostType[] = [];
  let wroteComments: CommentType[] = [];
  try {
    const token = parseJwt(context.req.headers.cookie ?? '');
    if (!token?.username) throw new Error('About getServerSideProps - jwt 토큰 없음');
    userInfo.username = token.username;

    // const userInfoAxiosConfig: AxiosRequestConfig = {
    //   method: 'get',
    //   url: 'http://localhost:8080/getUser',
    //   withCredentials: true,
    // };

    const balanceAxiosConfig: AxiosRequestConfig = {
      method: 'get',
      url: 'http://localhost:8080/token/balance',
      headers: {
        Cookie: context.req.headers.cookie ?? '',
      },
      withCredentials: true,
    };

    const wrotePostAxiosConfig: AxiosRequestConfig = {
      method: 'get',
      url: 'http://localhost:8080/posts',
      withCredentials: true,
      params: {
        username: token.username,
      },
    };

    const wroteCommentAxiosConfig: AxiosRequestConfig = {
      method: 'get',
      url: 'http://localhost:8080/posts/comments',
      withCredentials: true,
      params: {
        username: token.username,
      },
    };

    // userInfo = (await axios(userInfoAxiosConfig)).data;
    const balanceRes = (await axios(balanceAxiosConfig)).data;
    if (balanceRes?.message?.name === 'JsonWebTokenError') throw new Error('토큰 조회 실패');
    balance = balanceRes.token;
    wrotePost = (await axios(wrotePostAxiosConfig)).data;
    wroteComments = (await axios(wroteCommentAxiosConfig)).data;
    return {
      props: { userInfo, balance, wrotePost, wroteComments },
    };
  } catch (err) {
    // console.error(err);

    return {
      props: { userInfo, balance, wrotePost, wroteComments },
    };
  }
}

export default MyPage;
