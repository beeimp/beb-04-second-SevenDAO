import Axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Contents from '../../layouts/Contents';
import Header from '../../layouts/Header';
import { dummyData } from '../../test/dummyData';
import { PostType } from '../../types/post';
import { css } from '@emotion/react';
import Comments from '../../layouts/comments';
import { CommentType } from '../../types/comment';

interface Props {
  contentsData: PostType;
  commentsData: CommentType[];
}

const Detail: NextPage<Props> = ({ contentsData, commentsData }) => {
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
              <title>{contentsData.title}</title>
              <meta name="description" content={contentsData.contents} />
            </Header>
            <div css={contentsWrapperStyle}>
              <Contents content={contentsData} />
              <Comments comments={commentsData}></Comments>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { _id } = context.params;
  let contentsData = dummyData[0];
  let commentsData: CommentType[] = [];
  try {
    if (_id === undefined) {
    } else {
      // Contents API Request
      const CONTENTS_API_URL = `http://localhost:8080/posts/post?postId=${_id}`;
      const contents_res = await Axios.get(CONTENTS_API_URL);
      contentsData = contents_res.data;
    }

    return {
      props: {
        contentsData: contentsData,
        commentsData: commentsData,
      },
    };
  } catch (err) {
    return {
      props: {
        contentsData: contentsData,
        commentsData: commentsData,
      },
    };
  }
};
