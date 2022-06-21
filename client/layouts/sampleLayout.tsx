import { FunctionComponent } from 'react';
import SampleHead from '../components/sampleHead';
import SampleWrapper from '../components/sampleWrapper';

interface SampleLayoutProps {}

const SampleLayout: FunctionComponent<SampleLayoutProps> = () => {
  return (
    <SampleWrapper>
      <SampleHead></SampleHead>
    </SampleWrapper>
  );
};

export default SampleLayout;
