import {
  HeaderWrapper,
  LinkWrapper,
  MyPageIcon,
  Nav,
  Title,
  Home,
  NavWrapper,
  UserNav,
  WriteButton,
  LogInButton,
} from './header-styled';
import HeaderModal from './HeaderModal';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import auth from './auth';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import * as API from '@/utils/api';
import { useRouter } from 'next/router';
import { UserType } from '@/types/getTypes';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/user';

const Header = () => {
  const [isHeaderModalVisible, setIsHeaderModalVisible] =
    useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userNickname, setUserNickname] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        setIsLoggedIn(true);
        const idToken = await user.getIdToken(true);
        if (idToken) {
          const response = await API.get<UserType>('/user', {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });

          if (response.status === 200) {
            setUserNickname(response.data.data?.nickname);
            // console.log('nickname : ', userNickname);
            setIsAdmin(response.data.data?.admin);
          }
        }
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    signOut(auth);
    router.replace('/');
  };

  return (
    <HeaderWrapper>
      <Home href={'/'}>
        <Title>One-Line</Title>
      </Home>

      <Nav>
        <LinkWrapper href={'/search'}>
          <Image src="/images/search.svg" alt="검색" width="24" height="24" />
        </LinkWrapper>
        {isLoggedIn ? (
          <NavWrapper>
            <LogInButton type="button" onClick={handleLogout}>
              로그아웃
            </LogInButton>
            {isAdmin ? (
              <LinkWrapper href={'/admin'}>
                <Image
                  src="/images/Admin.png"
                  alt="관리자"
                  width="32"
                  height="32"
                />
              </LinkWrapper>
            ) : (
              <UserNav>
                <LinkWrapper href={'/write'}>
                  <WriteButton>글 작성</WriteButton>
                </LinkWrapper>
                <MyPageIcon
                  onClick={() => {
                    // console.log('log', isHeaderModalVisible);
                    setIsHeaderModalVisible(!isHeaderModalVisible);
                  }}
                >
                  <Image
                    src="/images/user-regular.svg"
                    alt="마이페이지"
                    width="32"
                    height="28"
                  />
                  <HeaderModal isVisible={isHeaderModalVisible} />
                </MyPageIcon>
              </UserNav>
            )}
          </NavWrapper>
        ) : (
          <NavWrapper>
            <LinkWrapper href={'/login'}>로그인</LinkWrapper>
            <LinkWrapper href={'/join'}>회원가입</LinkWrapper>
          </NavWrapper>
        )}
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
