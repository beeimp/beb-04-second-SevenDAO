import type { NextPage } from 'next';
import { useState } from 'react';
import { SampleType } from '../types/sample';

const Home: NextPage = () => {
  const [sample, setSample] = useState<SampleType>({
    id: 0,
    title: '',
  });
  return <div>Home Page</div>;
};

export default Home;
