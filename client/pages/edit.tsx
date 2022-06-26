import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../layouts/Header';
import PostEditor from '../layouts/post/editor';
import { RootState } from '../store';
import { editActions } from '../store/editSlice';

interface WriterPageProps {}

const WriterPage: NextPage<WriterPageProps> = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const wrapperStyle = css`
    display: flex;
  `;

  useEffect(() => {
    if (auth.isAuth) {
      dispatch(editActions.setUsername(auth.username));
    } else {
      router.push('/sign-in');
    }
  });

  return (
    <div css={wrapperStyle}>
      <Header />
      <PostEditor></PostEditor>
    </div>
  );
};

export default WriterPage;
