import type { NextPage } from 'next';
import Header from '../layouts/Header';
import { css } from '@emotion/react';
import ContentsList from '../layouts/contents/ContentsList';
import { PostType } from '../types/post';
import { useState } from 'react';

interface Props {}

const Home: NextPage<Props> = () => {
  const [postList, setPostList] = useState<PostType[]>([]);
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

  const wrapperStyle = css`
    display: flex;
  `;

  return (
    <div css={wrapperStyle}>
      <Header />
      <div>
        <ContentsList postList={postList} setPostList={setPostList} />
      </div>
    </div>
  );
};

export default Home;
