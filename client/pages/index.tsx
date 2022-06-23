import type { NextApiRequest, NextApiResponse, NextPage } from 'next';
import { useState } from 'react';
import { SampleType } from '../types/sample';
import Header from '../layouts/Header';
import { parseJwt } from '../utils/jwt';
import { css } from '@emotion/react';
import ContentsList from '../layouts/ContentsList';
import { dummyData } from '../test/dummyData';
import Axios from 'axios';
import { PostType } from '../types/post';

interface Props {
  posts: PostType[];
}

const Home: NextPage<Props> = ({ posts }) => {
  const wrapperStyle = css`
    display: flex;
  `;
  const [list, setList] = useState<PostType[]>(posts);

  const [sample, setSample] = useState<SampleType>({
    id: 0,
    title: '',
  });
  return (
    <div css={wrapperStyle}>
      <Header />
      <div>
        <ContentsList posts={posts} />
      </div>
    </div>
  );
};

export async function getServerSideProps(req: NextApiRequest, res: NextApiResponse) {
  // const data = await Axios.get('http://localhost:8080/posts?pageNum=1&count=5');
  // const posts = data.data;
  const posts = dummyData;

  // Fetch auth from external API
  const token = req.cookies?.jwt ?? undefined;
  const auth = {
    username: '',
    isAuth: false,
    errorMessage: '',
  };
  if (token) {
    const { username } = parseJwt(token);
    auth.username = username;
    auth.isAuth = true;
  } else {
    auth.username = '';
    auth.isAuth = false;
    auth.errorMessage = '로그인 실패';
  }

  // Pass auth to the page via props
  return { props: { auth, posts } };
}

export default Home;
