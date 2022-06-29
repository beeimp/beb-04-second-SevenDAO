import { css } from '@emotion/react';
import axios, { AxiosRequestConfig } from 'axios';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import About from '../layouts/About';
import Header from '../layouts/Header';
import Transfer from '../layouts/Transfer';
import { RootState } from '../store';
import { CommentType, WroteCommetType } from '../types/comment';
import { PostType } from '../types/post';
import { UserInfoType } from '../types/user';
import { parseJwt } from '../utils/jwt';

interface MyPageProps {
  userInfo: UserInfoType;
  wrotePost: PostType[];
  wroteComments: WroteCommetType[];
}

const MyPage: NextPage<MyPageProps> = ({ userInfo, wrotePost, wroteComments }) => {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);
  const displayTransfer = useSelector((state: RootState) => state.modal.displayTransfer);

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
      <About userInfo={userInfo} wrotePost={wrotePost} wroteComments={wroteComments}></About>
      {displayTransfer ? (
        <Transfer address={userInfo.address} token={userInfo.token}></Transfer>
      ) : undefined}
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let userInfo: UserInfoType = {
    username: '',
    email: '',
    address: '',
    token: 0,
  };
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

    const userInfoAxiosConfig: AxiosRequestConfig = {
      method: 'get',
      url: 'http://localhost:8080/mypage',
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
    const userInfoData = (await axios(userInfoAxiosConfig)).data;
    if (userInfoData === undefined || userInfoData?.message?.name === 'JsonWebTokenError')
      throw new Error('사용자 정보 조회 실패');
    userInfo.username = userInfoData?.username ?? '';
    userInfo.email = userInfoData?.email ?? '';
    userInfo.address = userInfoData?.address ?? '';
    userInfo.token = userInfoData?.token ?? 0;

    wrotePost = (await axios(wrotePostAxiosConfig)).data;
    wroteComments = (await axios(wroteCommentAxiosConfig)).data;
    return {
      props: { userInfo, wrotePost, wroteComments },
    };
  } catch (err) {
    // console.error(err);

    return {
      props: { userInfo, wrotePost, wroteComments },
    };
  }
}

export default MyPage;
