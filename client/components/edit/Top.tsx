import { css } from '@emotion/react';
import { Button } from '@mui/material';
import Axios, { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/router';
import { FunctionComponent, MouseEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface EditTopProps {}

const EditTop: FunctionComponent<EditTopProps> = () => {
  const router = useRouter();
  const postData = useSelector((state: RootState) => state.edit);

  const publishHandler: MouseEventHandler = async () => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'http://localhost:8080/posts/post',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      data: postData,
    };

    try {
      await Axios(config);
      router.push('/');
    } catch (err) {
      alert('글쓰기에 실패했습니다.');
    }
  };

  const wrapperStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 150px;
    padding: 0 2em;
  `;

  return (
    <div css={wrapperStyle}>
      {/* <HeadLogo></HeadLogo> */}
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
