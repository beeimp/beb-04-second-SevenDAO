import type { NextPage } from 'next';
import { useState } from 'react';
import { SampleType } from '../types/sample';
import Header from '../layouts/Header';

const Home: NextPage = () => {
  const [sample, setSample] = useState<SampleType>({
    id: 0,
    title: '',
  });
  return (
    <div>
      <Header />
    </div>
  );
};

export default Home;
