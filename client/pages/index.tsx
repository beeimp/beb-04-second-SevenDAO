import type { NextPage } from 'next';
import Header from '../layouts/Header';
import { css } from '@emotion/react';
import ContentsList from '../layouts/contents/ContentsList';
import Axios, { AxiosRequestConfig } from 'axios';
import { PostType } from '../types/post';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import useIntersectionObserver from '../components/useIntersectionObserver';

interface Props {
  posts: PostType[];
}

const Home: NextPage<Props> = ({ posts }) => {
  const [postList, setPostList] = useState<PostType[]>(posts);
  const [pageNum, setPageNum] = useState<number>(2);
  const [throttle, setThrottle] = useState<boolean>(false);

  // const scrollHandler = useCallback(async () => {
  //   const { innerHeight } = window; // 브라우저창 내용의 크기 (스크롤을 포함하지 않음)
  //   const { scrollHeight } = document.body; // 브라우저 총 내용의 크기 (스크롤을 포함한다)
  //   const { scrollTop } = document.documentElement; // 현재 스크롤바의 위치

  //   if (throttle) return;
  //   if (!throttle) {
  //     setThrottle(true);
  //     setTimeout(async () => {
  //       if (Math.round(scrollTop + innerHeight) > scrollHeight) {
  //         setPageNum(() => pageNum + 1);
  //         const searchData = await getMorePosts(pageNum);
  //         setPostList(() => [...postList, ...searchData]);
  //       }
  //       setThrottle(false);
  //     }, 100);
  //   }
  // }, [pageNum, postList, throttle]);

  // useEffect(() => {
  //   window.addEventListener('scroll', scrollHandler, true);
  //   return () => {
  //     window.removeEventListener('scroll', scrollHandler, true);
  //   };
  // }, [scrollHandler]);

  const getMorePosts = async (num: number) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `http://localhost:8080/posts?pageNum=${num}&count=5`,
      withCredentials: true,
    };
    const res = await axios(config);
    return res.data;
  };

  const wrapperStyle = css`
    display: flex;
    border: 20px solid black;
  `;

  return (
    <div css={wrapperStyle}>
      <Header />
      <div>
        <ContentsList postList={postList} setPostList={setPostList} pageNum={pageNum} />
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
