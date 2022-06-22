import { FunctionComponent } from 'react';
import HeadLogo from '../components/HeadLogo';
import HeadWrapper from '../components/HeadWrapper';
import HeadAccountButton from '../components/HeadAccountButton';
import HeadMenuButton from '../components/HeadMenuButton';

interface LayoutProps {}

const Header: FunctionComponent<LayoutProps> = () => {
  return (
    <HeadWrapper>
      <HeadLogo />
      <HeadMenuButton />
      <HeadAccountButton iconUrl="/sevendao-logo.png" size="40px" />
    </HeadWrapper>
  );
};

export default Header;
