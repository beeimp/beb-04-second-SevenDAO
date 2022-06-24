import { css } from '@emotion/react';
import { FunctionComponent, ReactNode } from 'react';

interface CommentViewWrapperProps {
  children: ReactNode;
}

const CommentViewWrapper: FunctionComponent<CommentViewWrapperProps> = ({ children }) => {
  const wrapperStyle = css`
    padding: 5px;
  `;
  return <div css={wrapperStyle}>{children}</div>;
};

export default CommentViewWrapper;
