import { css } from '@emotion/react';
import { Balance } from '@mui/icons-material';
import axios, { AxiosRequestConfig } from 'axios';
import { GetServerSidePropsContext, NextPage } from 'next';
import About from '../layouts/About';
import Header from '../layouts/Header';
import { CommentType } from '../types/comment';
import { PostType } from '../types/post';

interface AboutPageProps {
  userInfo: { username: string; email: string };
  balance: number;
  wrotePost: PostType[];
  wroteComments: CommentType[];
}

const AboutPage: NextPage<AboutPageProps> = ({ userInfo, balance, wrotePost, wroteComments }) => {
  const wrapperStyle = css`
    display: flex;
  `;

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
  const userInfoAxiosConfig: AxiosRequestConfig = {
    method: 'get',
    url: 'http://localhost:8080/getUser',
    withCredentials: true,
  };

  const balanceAxiosConfig: AxiosRequestConfig = {
    method: 'get',
    url: 'http://localhost:8080/token/balance',
    withCredentials: true,
  };

  const wrotePostAxiosConfig: AxiosRequestConfig = {
    method: 'get',
    url: 'http://localhost:8080/posts',
    withCredentials: true,
    params: {
      // username: username,
    },
  };

  const wroteCommentAxiosConfig: AxiosRequestConfig = {
    method: 'get',
    url: 'http://localhost:8080/posts/comments',
    withCredentials: true,
    params: {
      // username: username,
    },
  };

  try {
    const userInfo: { username: string; email: string } = (await axios(userInfoAxiosConfig)).data;
    const balance: number = (await axios(balanceAxiosConfig)).data;
    const wrotePost: PostType[] = (await axios(wrotePostAxiosConfig)).data;
    const wroteComments: CommentType[] = (await axios(wroteCommentAxiosConfig)).data;
    return {
      props: { userInfo, balance, wrotePost, wroteComments },
    };
  } catch (err) {
    console.error(err);
    const userInfo: { username: string; email: string } = {
      username: 'sdao',
      email: 'sdao@sevendao.com',
    };
    const balance: number = 1;
    const wrotePost: PostType[] = [];
    const wroteComments: CommentType[] = [];

    return {
      props: { userInfo, balance, wrotePost, wroteComments },
    };
  }
}

export default AboutPage;
