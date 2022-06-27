import { FunctionComponent, useEffect } from 'react';
import { commentsDummyData } from '../../test/dummyData';
import CommentWrite from './write';
import Comment from './comment';
import { css } from '@emotion/react';
import { CommentType } from '../../types/comment';

interface CommentsProps {
  comments: CommentType[];
}

const Comments: FunctionComponent<CommentsProps> = ({ comments }) => {
  const wrapperStyle = css`
    margin: 25px;
  `;

  const emptyStyle = css`
    text-align: center;
    color: gray;
  `;

  return (
    <div css={wrapperStyle}>
      <CommentWrite></CommentWrite>
      {comments.length > 0 ? (
        comments
          .sort((a, b) => b.created_date - a.created_date)
          .map((comment, index) => <Comment key={index} comment={comment}></Comment>)
      ) : (
        <div css={emptyStyle}>댓글이 없습니다.</div>
      )}
    </div>
  );
};

export default Comments;
