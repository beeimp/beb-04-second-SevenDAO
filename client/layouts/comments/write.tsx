import axios, { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/router';
import React, { FunctionComponent, MouseEventHandler, useRef } from 'react';
import { useSelector } from 'react-redux';
import CommentWriteButton from '../../components/comment/write/button';
import CommentWriteInput from '../../components/comment/write/input';
import CommenWritetWrapper from '../../components/comment/write/wrapper';
import { RootState } from '../../store';

interface CommentWriteProps {}

const CommentWrite: FunctionComponent<CommentWriteProps> = () => {
  const router = useRouter();
  const { postId } = router.query;
  const inputRef = useRef<HTMLInputElement>(null);
  const commentWriter = useSelector((state: RootState) => state.commentWrite);
  const submitHandler: MouseEventHandler = async (
    event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault();
    if (commentWriter.comment === '') {
      inputRef.current?.focus();
    } else {
      const config: AxiosRequestConfig = {
        method: 'post',
        url: 'http://localhost:8080/posts/comment',
        params: {
          postId: postId,
        },
        data: commentWriter,
      };
      await axios(config);
    }
  };

  const cancelHandler: MouseEventHandler = () => {};

  return (
    <CommenWritetWrapper>
      <div>
        <div>avatar</div>
      </div>
      <div>
        <CommentWriteInput inputRef={inputRef}></CommentWriteInput>
        <CommentWriteButton
          submitHandler={submitHandler}
          cancelHandler={cancelHandler}
        ></CommentWriteButton>
      </div>
    </CommenWritetWrapper>
  );
};

export default CommentWrite;
