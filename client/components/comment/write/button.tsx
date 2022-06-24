import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { FunctionComponent, MouseEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface CommentWriteButtonProps {
  submitHandler: MouseEventHandler;
  cancelHandler: MouseEventHandler;
}

const CommentWriteButton: FunctionComponent<CommentWriteButtonProps> = ({
  submitHandler = () => {},
  cancelHandler = () => {},
}) => {
  return (
    <div>
      <Button variant="contained" onClick={submitHandler}>
        댓글
      </Button>
      <Button onClick={cancelHandler}>취소</Button>
    </div>
  );
};

export default CommentWriteButton;
