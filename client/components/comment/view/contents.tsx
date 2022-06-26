import { css } from '@emotion/react';
import { FunctionComponent } from 'react';

interface CommentViewContentsProps {
  comment: string;
}

const CommentViewContents: FunctionComponent<CommentViewContentsProps> = ({
  comment = 'comment',
}) => {
  const wrapperStyle = css``;

  const commentStyle = css`
    margin-left: 50px;
    margin-top: 0.1em;
    margin-bottom: 1em;
  `;
  return (
    <div css={wrapperStyle}>
      <p css={commentStyle}>{comment}</p>
    </div>
  );
};

export default CommentViewContents;
