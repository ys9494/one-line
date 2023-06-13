import styled from 'styled-components';
import Link from 'next/link';

export const MainWrapper = styled.main`
  width: 100%;
  background-color: #fff;
  padding-top: 10px;
  h1 {
    color: violet;
  }

  button {
    margin: 10px 0;
  }
  a {
    display: block;
  }
`;

export const SubHeader = styled.div`
  padding: 0 30px;
  margin-left: 30px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  font-size: 20px;
`;

export const MainNav = styled.span<{ isActive: boolean }>`
  position: relative;
  padding: 7px 20px;
  font-size: 1.1rem;
  cursor: pointer;
  font-family: 'Roboto Flex', sans-serif;
  font-weight: bold;
  border-bottom: ${props =>
    props.isActive ? '3px solid #729fbf' : '3px solid #ddd'};
`;

export const MainNavLink = styled(Link)`
  cursor: pointer;
  height: 30px;
`;
