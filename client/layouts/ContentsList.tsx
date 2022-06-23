import { FunctionComponent, useState, useEffect } from 'react';
import Contents from './Contents';
import { PostType } from '../types/post';
import Axios from 'axios';

interface LayoutProps {
  posts: PostType[];
}

const ContentsList: FunctionComponent<LayoutProps> = ({ posts }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, [posts]);

  return <>{loading && <Contents list={posts}></Contents>}</>;
};

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

export default ContentsList;
