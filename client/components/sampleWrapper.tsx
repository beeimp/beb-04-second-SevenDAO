import { FunctionComponent, ReactNode } from 'react';

interface SampleWrapperProps {
  children: ReactNode;
}

const SampleWrapper: FunctionComponent<SampleWrapperProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default SampleWrapper;
