import type { NextPage } from 'next';
import Header from '../layouts/Header';
import { css } from '@emotion/react';
import ContentsList from '../layouts/contents/ContentsList';
import Axios from 'axios';
import { PostType } from '../types/post';
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ContentsLoading from '../layouts/contents/ContentsLoading';

interface Props {
  posts: PostType[];
}

const Home: NextPage<Props> = ({ posts }) => {
  const [postList, setPostList] = useState<PostType[]>(posts);
  const [pageNum, setPageNum] = useState<number>(2);
  const [throttle, setThrottle] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const targetRef = useRef<HTMLDivElement>(null);

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

  const loadPosts = useCallback(() => {
    setIsLoading(true);
    axios({
      method: 'get',
      url: `http://localhost:8080/posts?pageNum=${pageNum}&count=5`,
      withCredentials: true,
    })
      .then((response) => {
        if (Array.isArray(response.data) && !response.data.length) {
          setIsLoading(false);
          return;
        }
        if (response.data.length) {
          setPostList((prev) => [...prev, ...response.data]);
          setPageNum(pageNum + 1);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error);
      });
  }, [pageNum]);

  useEffect(() => {
    loadPosts();
  }, []);

  const onIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (!entry.isIntersecting) {
        return;
      }
      loadPosts();
    },
    [loadPosts]
  );

  useEffect(() => {
    if (!targetRef.current) {
      return;
    }
    const observer = new IntersectionObserver(onIntersect, {
      threshold: 0.4,
    });
    observer.observe(targetRef.current);

    return () => observer && observer.disconnect();
  }, [isLoading, onIntersect]);

  const wrapperStyle = css`
    display: flex;
  `;

  return (
    <div css={wrapperStyle}>
      <Header />
      <div>
        <ContentsList postList={postList} setPostList={setPostList} pageNum={pageNum} />
        {!isLoading && (
          <div
            ref={targetRef}
            style={{
              width: '100%',
              height: '5rem',
            }}
          />
        )}
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
