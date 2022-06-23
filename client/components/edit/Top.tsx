import { css } from '@emotion/react';
import { Button } from '@mui/material';
import Axios, { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/router';
import { FunctionComponent, MouseEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import HeadLogo from '../header/HeadLogo';

interface EditTopProps { }

const EditTop: FunctionComponent<EditTopProps> = () => {
  const router = useRouter();
  const postData = useSelector((state: RootState) => state.edit);
  const wrapperStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 2em;
  `;

  const publishHandler: MouseEventHandler = async () => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'http://localhost:8080/posts',
      data: postData,
    };

    try {
      await Axios(config);
      router.push('/');
    } catch (err) {
      alert('글쓰기에 실패했습니다.');
      console.error(err);
    }
  };

  return (
    <div css={wrapperStyle}>
      <HeadLogo></HeadLogo>
      <div></div>
      <div>
        <Button variant="contained" onClick={publishHandler}>
          Publish
        </Button>
      </div>
    </div>
  );
};

export default EditTop;
