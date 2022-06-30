import { Button, css } from '@mui/material';
import { FunctionComponent, MouseEventHandler } from 'react';

interface CommentWriteButtonProps {
  submitHandler: MouseEventHandler;
}

const CommentWriteButton: FunctionComponent<CommentWriteButtonProps> = ({
  submitHandler = () => {},
}) => {
  const wrapperStyle = css`
    display: flex;
    padding: 10px;
  `;
  return (
    <div css={wrapperStyle}>
      <Button variant="contained" onClick={submitHandler}>
        댓글
      </Button>
    </div>
  );
};

export default CommentWriteButton;
