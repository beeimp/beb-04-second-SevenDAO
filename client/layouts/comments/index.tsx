import { FunctionComponent, useEffect } from 'react';
import { commentsDummyData } from '../../test/dummyData';
import CommentWrite from './write';
import Comment from './comment';
import { css } from '@emotion/react';

interface CommentsProps {}

const Comments: FunctionComponent<CommentsProps> = () => {
  const comments = commentsDummyData;
  const wrapperStyle = css`
    margin: 25px;
  `;
  return (
    <div css={wrapperStyle}>
      <CommentWrite></CommentWrite>
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment}></Comment>
      ))}
    </div>
  );
};

export default Comments;
