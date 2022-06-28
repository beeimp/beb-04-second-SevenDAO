import type { NextApiRequest, NextApiResponse, NextPage } from 'next';
import { useState } from 'react';
import { SampleType } from '../types/sample';
import Header from '../layouts/Header';
import { css } from '@emotion/react';
import ContentsList from '../layouts/contents/ContentsList';
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
  const data = await Axios.get('http://localhost:8080/posts?pageNum=1&count=20');
  const posts = data.data;
  // console.log(posts);
  // const posts = dummyData;

  // Pass auth to the page via props
  return { props: { posts } };
}

export default Home;
