import { FunctionComponent } from 'react';
import HeadLogo from '../components/header/HeadLogo';
import HeadWrapper from '../components/header/HeadWrapper';
import HeadAccountButton from '../components/header/HeadAccountButton';
import HeadMenuButton from '../components/header/HeadMenuButton';

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
