import { FunctionComponent, useEffect } from 'react';
import { commentsDummyData } from '../../test/dummyData';
import CommentWrite from './write';
import Comment from './comment';

interface CommentsProps {}

const Comments: FunctionComponent<CommentsProps> = () => {
  const comments = commentsDummyData;
  return (
    <div>
      <CommentWrite></CommentWrite>
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment}></Comment>
      ))}
    </div>
  );
};

export default Comments;
