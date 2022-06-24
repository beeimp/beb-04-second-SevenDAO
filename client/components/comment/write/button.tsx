import { Button, css } from '@mui/material';
import { useRouter } from 'next/router';
import { FunctionComponent, MouseEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

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
