import type { NextApiRequest, NextApiResponse, NextPage } from 'next';
import { useState } from 'react';
import { SampleType } from '../types/sample';
import Header from '../layouts/Header';
import { parseJwt } from '../utils/jwt';
import Sample from '../components/sample';
import { css } from '@emotion/react';

const Home: NextPage = (props) => {
  const wrapperStyle = css`
    display: flex;
  `;
  console.log(props);
  const [sample, setSample] = useState<SampleType>({
    id: 0,
    title: '',
  });
  return (
    <div css={wrapperStyle}>
      <Header />
    </div>
  );
};

export async function getServerSideProps(req: NextApiRequest, res: NextApiResponse) {
  // Fetch auth from external API
  const token = req.cookies?.jwt ?? undefined;
  const auth = {
    username: '',
    isAuth: false,
    errorMessage: '',
  };
  if (token) {
    const { username } = parseJwt(token);
    auth.username = username;
    auth.isAuth = true;
  } else {
    auth.username = '';
    auth.isAuth = false;
    auth.errorMessage = '로그인 실패';
  }

  // Pass auth to the page via props
  return { props: { auth } };
}

export default Home;
