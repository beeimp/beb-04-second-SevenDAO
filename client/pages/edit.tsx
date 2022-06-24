import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostEditor from '../layouts/post/editor';
import { RootState } from '../store';
import { editActions } from '../store/editSlice';

interface WriterPageProps {}

const WriterPage: NextPage<WriterPageProps> = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (auth.isAuth) {
      dispatch(editActions.setUsername(auth.username));
    } else {
      router.push('/sign-in');
    }
  });

  return (
    <>
      {/* <Header /> */}
      <PostEditor></PostEditor>
    </>
  );
};

export default WriterPage;
