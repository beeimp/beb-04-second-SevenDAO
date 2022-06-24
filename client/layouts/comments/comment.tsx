import { FunctionComponent } from 'react';
import CommentViewWrapper from '../../components/comment/view/wrapper';
import CommentViewContents from '../../components/comment/view/contents';
import CommentViewTop from '../../components/comment/view/top';
import { CommentType } from '../../types/comment';

interface CommentsViewProps {
  comment: CommentType;
}

const Comment: FunctionComponent<CommentsViewProps> = ({ comment }) => {
  return (
    <CommentViewWrapper>
      <CommentViewTop username={comment.username} date={comment.created_date}></CommentViewTop>
      <CommentViewContents comment={comment.comment}></CommentViewContents>
    </CommentViewWrapper>
  );
};

export default Comment;
