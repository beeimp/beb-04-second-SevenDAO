import { NextPage } from 'next/types';
import EditWrapper from '../components/edit/Wrapper';
import Header from '../layouts/Header';
import PostEditor from '../layouts/post/editor';

const WriterPage: NextPage = () => {
  return (
    <>
      {/* <Header /> */}
      <PostEditor></PostEditor>
    </>
  );
};

export default WriterPage;
