import { css } from '@emotion/react';
import { FunctionComponent, ReactNode } from 'react';

interface CommentWrapperProps {
  children: ReactNode;
}

const CommentWrapper: FunctionComponent<CommentWrapperProps> = ({ children }) => {
  const wrapperStyle = css``;
  return <div css={wrapperStyle}>{children}</div>;
};

export default CommentWrapper;
