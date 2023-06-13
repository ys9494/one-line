import styled from 'styled-components';

export const PostListContainer = styled.div`
  padding: 10px 40px;
  position: relative;
  background: #fbfbfb;
`;

export const LoadingWrapper = styled.div`
  margin: 40px 0;
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PostItemWrapper = styled.div`
  height: 340px;
  display: flex;
  flex-direction: column;
  background: #fefefe;
  justify-content: space-between;
  border-radius: 10px;
  padding: 10px 20px;
  &:hover {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    transition: all 0.5s;
  }
`;

export const Detail = styled.div`
  flex-grow: 1;
  cursor: pointer;
`;

export const UserInfoAndTime = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #eee;
  div {
    display: flex;
    align-items: center;
    cursor: pointer;
    span {
      margin-left: 5px;
    }
    img {
      border-radius: 50%;
      background-color: #ddd;
    }
    &:hover {
      opacity: 0.5;
      transition: all 0.3s;
    }
  }
  p {
    font-size: 0.8rem;
  }
`;

export const ViewsAndLikes = styled.div`
  display: flex;
  justify-content: right;
  p {
    margin-left: 10px;
    font-size: 0.8rem;
  }
`;
