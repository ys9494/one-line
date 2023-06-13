import styled from 'styled-components';

export const PostListContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

export const PostItemContainer = styled.div`
  border-top: 1px solid #ddd;
  padding: 20px 0;
  cursor: pointer;

  &:first-child {
    border-top: none;
  }

  h4,
  p {
    margin: 0;
  }
  h4 {
    font-size: 1.2rem;
    display: inline;
  }
  p {
    margin: 10px 0;
    font-size: 1.1rem;
  }

  &:hover {
    opacity: 0.7;
    transition: all 0.3s;
  }
  &:hover h4 {
    border-bottom: 1px solid #000;
    transition: all 0.3s;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #a8a8a8;
  font-size: 0.8rem;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  img {
    border-radius: 50%;
    background-color: #ddd;
  }
  span {
    margin-left: 5px;
  }
`;

export const PostInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  div {
    width: 3px;
    height: 3px;
    background-color: #a8a8a8;
    border-radius: 50%;
    margin: 0 5px;
  }
`;

export const NoPosts = styled.div`
  text-align: center;
`;
