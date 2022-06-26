import Axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Contents from '../../layouts/Contents';
import Header from '../../layouts/Header';
import { dummyData } from '../../test/dummyData';
import { PostType } from '../../types/post';
import { css } from '@emotion/react';
import Comments from '../../layouts/comments';

interface Props {
  item: PostType;
}

const Detail: NextPage<Props> = ({ item }) => {
  const wrapperStyle = css`
    display: flex;
  `;
  const contentsWrapperStyle = css`
    max-width: 800px;
  `;

  return (
    <>
      {Contents && (
        <>
          <div css={wrapperStyle}>
            <Header>
              <title>{item.title}</title>
              <meta name="description" content={item.contents} />
            </Header>
            <div css={contentsWrapperStyle}>
              <Contents content={item} />
              <Comments></Comments>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const postId = context.params?._id;
  // const API_URL = `http://localhost:8080/posts/post?postId=${postId}.json`;
  // const res = await Axios.get(API_URL);
  // const data = res.data;
  const data = dummyData[0];

  return {
    props: {
      item: data,
    },
  };
};
