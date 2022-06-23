import { ScopedCssBaseline } from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import ContentsList from '../layouts/ContentsList';
import Axios from 'axios';
import { PostType } from '../types/post';

const Contents: NextPage = (props) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ContentsList posts={props} />
    </>
  );
};

export default Contents;

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await Axios.get('http://localhost:8080/posts?pageNum=1&count=5');
  const posts = res.data;

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}
