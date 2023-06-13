import styled from 'styled-components';
import Link from 'next/link';

export const HeaderWrapper = styled.header`
  max-width: 1800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px;
  align-items: center;

  @media (max-width: 540px) {
    & {
      flex-direction: column-reverse;
    }
  }
`;

export const Title = styled.div`
  font-family: 'Roboto Flex', sans-serif;
  font-weight: bold;
  font-size: 28px;
  color: #598392;
  padding: 20px 0;
`;

export const Nav = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
`;

export const LinkWrapper = styled(Link)`
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
  margin-left: 14px;
  &:hover {
    opacity: 0.7;
  }
`;

export const Home = styled(Link)`
  cursor: pointer;
`;

export const NavWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const UserNav = styled(NavWrapper)``;

export const LogInButton = styled.button`
  border: none;
  background: none;
  font-weight: bold;
  font-family: 'Roboto Flex', sans-serif;
  font-size: 16px;
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    opacity: 0.6;
  }
`;

export const WriteButton = styled.span`
  background-color: #aec3b0;
  padding: 3px 10px;
  border-radius: 10px;
  &:hover {
    opacity: 0.7;
    transition: all 0.2s;
  }
`;

export const MyPageIcon = styled.div`
  margin-left: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    cursor: pointer;
  }
`;

export const HeaderModalContainer = styled.div<{ isVisible: boolean }>`
  width: 180px;
  padding: 14px 0;
  position: absolute;
  right: 0;
  top: 50px;
  background: rgba(255, 255, 255, 0.9);
  /* border-radius: 10px; */
  /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
  flex-direction: column;
  align-items: flex-end;
  z-index: 99;
  display: flex;
  padding: 16px 0;
  display: ${props => (props.isVisible ? 'flex' : 'none')};

  a,
  button {
    font-size: 1.1rem;
    font-weight: bold;
    margin: 7px 0;
    padding-right: 24px;
    &:hover {
      color: #598392;
    }
  }

  button {
    border: none;
    background: none;
    outline: none;
  }
`;
