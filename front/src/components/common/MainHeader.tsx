import { useEffect } from 'react';
import {
  MainWrapper,
  SubHeader,
  MainNav,
  MainNavLink,
} from './mainHeader-styled';
import { useRouter } from 'next/router';

const MainHeader = () => {
  const router = useRouter();
  const path = router.pathname;

  // useEffect(() => {
  //   console.log('path', path);
  // }, [path]);

  return (
    <MainWrapper>
      <SubHeader>
        <MainNavLink href="/" className="trend">
          <MainNav isActive={path == '/'}>trending</MainNav>
        </MainNavLink>
        <MainNavLink href="/recent-posts" className="recent">
          <MainNav isActive={path == '/recent-posts'}>recent</MainNav>
        </MainNavLink>
      </SubHeader>
    </MainWrapper>
  );
};

export default MainHeader;
