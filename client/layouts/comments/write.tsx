import { css } from '@emotion/react';
import axios, { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/router';
import React, { FunctionComponent, MouseEventHandler, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../../components/Avatar';
import CommentWriteButton from '../../components/comment/write/button';
import CommentWriteInput from '../../components/comment/write/input';
import CommenWritetWrapper from '../../components/comment/write/wrapper';
import { RootState } from '../../store';
import { commentWriteActions } from '../../store/commentWriteSlice';

interface CommentWriteProps {}

const CommentWrite: FunctionComponent<CommentWriteProps> = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { _id } = router.query;
  const inputRef = useRef<HTMLInputElement>(null);
  const commentWriter = useSelector((state: RootState) => state.commentWrite);
  const auth = useSelector((state: RootState) => state.auth);
  const submitHandler: MouseEventHandler = async (
    event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault();
    if (!auth.isAuth) {
      router.push('/sign-in');
      return;
    }
    if (commentWriter.comment === '') {
      inputRef.current?.focus();
    } else {
      const username = dispatch(commentWriteActions.setUsername(auth.username)).payload;
      const postId = dispatch(commentWriteActions.setPostId(_id as string)).payload;
      const config: AxiosRequestConfig = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/comment`,
        params: {
          postId: _id,
        },
        withCredentials: true,
        data: {
          ...commentWriter,
          username: username,
          postId: postId,
        },
      };
      await axios(config);
      router.reload();
    }
  };

  const writeInputStyle = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
  `;

  return (
    <CommenWritetWrapper>
      <Avatar username={auth.username}></Avatar>
      <div css={writeInputStyle}>
        <CommentWriteInput inputRef={inputRef}></CommentWriteInput>
        <CommentWriteButton submitHandler={submitHandler}></CommentWriteButton>
      </div>
    </CommenWritetWrapper>
  );
};

export default CommentWrite;
