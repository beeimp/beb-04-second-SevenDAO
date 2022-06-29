import type { NextPage } from 'next';
import Header from '../layouts/Header';
import { css } from '@emotion/react';
import ContentsList from '../layouts/contents/ContentsList';
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

export async function getServerSideProps() {
  const data = await Axios.get('http://localhost:8080/posts?pageNum=1&count=5');
  const posts = data.data;
  // console.log(posts);
  // const posts = dummyData;

  // Pass auth to the page via props
  return { props: { posts } };
}

export default Home;
