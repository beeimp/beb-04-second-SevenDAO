import { css, TextField } from '@mui/material';
import { ChangeEvent, ChangeEventHandler, FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { commentWriteActions } from '../../../store/commentWriteSlice';

interface CommentWriteInputProps {
  inputRef: React.RefObject<HTMLInputElement>;
}

const CommentWriteInput: FunctionComponent<CommentWriteInputProps> = ({ inputRef }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState<boolean>(false);
  const commentHandler: ChangeEventHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setError(event.target.value === '');
    dispatch(commentWriteActions.setComment(event.target.value));
  };

  const wrapperStyle = css`
    width: 100%;
  `;
  return (
    <div css={wrapperStyle}>
      <TextField
        error={error}
        multiline
        placeholder="댓글 추가.."
        onChange={commentHandler}
        ref={inputRef}
        css={wrapperStyle}
      ></TextField>
    </div>
  );
};

export default CommentWriteInput;
