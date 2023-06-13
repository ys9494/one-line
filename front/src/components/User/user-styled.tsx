import styled from 'styled-components';

export const UserPageContainer = styled.main`
  max-width: 800px;
  padding: 10px 20px;
  margin: 0 auto;
`;

export const UserDetailContainer = styled.div`
  padding-top: 20px;
`;

export const UserProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: start;
  margin-bottom: 20px;
`;

export const UserProfileImageWrapper = styled.div`
  width: 58px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 50%;
    background-color: #ddd;
  }
`;

export const UserInfoWrapper = styled.div`
  margin-left: 10px;
  h1,
  p {
    margin: 0;
  }
  h1 {
    font-size: 1.6rem;
  }
  p {
    font-size: 1.1rem;
  }
`;

export const Button = styled.button`
  border: 1px solid #ccc;
  margin-left: 20px;
  padding: 5px 10px;
  border-radius: 15px;
`;

export const FollowButton = styled(Button)`
  background-color: #fff;
  &:hover {
    transition: all 0.3s;
    background-color: #eee;
    outline: none;
  }
`;

export const FollowingButton = styled(Button)`
  background: #9ecab5;
  &:hover {
    transition: all 0.3s;
    background-color: #d1e7dd;
    outline: none;
  }
`;

export const SubscribeNumber = styled.div`
  width: 200px;
  display: flex;
  h3 {
    margin-right: 20px;
    font-weight: normal;
    span {
      margin-left: 5px;
      font-weight: bold;
      color: #729fbf;
    }
  }
`;

export const MySubscribeNumber = styled(SubscribeNumber)`
  cursor: pointer;
  &:hover span {
    /* transition: all 0.3s; */
    border-bottom: 2px solid #729fbf;
  }
`;

export const UserCategoryContainer = styled.div`
  margin: 10px 0;
  background-color: #fbfbfb;
  padding: 0 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h4 {
    margin: 0;
    font-size: 1.1rem;
  }
`;

export const CategoryExpandWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

export const UserPostContainer = styled.div`
  margin-top: 20px;
  > h4 {
    margin: 0;
    font-size: 1.2rem;
    padding-bottom: 14px;
    border-bottom: 1px solid #ddd;
  }
`;

// Categories
export const CategoryListContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px 0;
  justify-content: center;
`;

export const CategoryItemContainer = styled.div<{ isActive: boolean }>`
  margin-right: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  /* background-color: #fff; */
  background-color: ${props => (props.isActive ? '#598392' : '#fff')};
  color: ${props => (props.isActive ? '#fff' : '#000')};
  padding: 5px 10px;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    /* transition: all 0.2s; */
    background-color: #598392;
    color: #fff;
  }
`;
