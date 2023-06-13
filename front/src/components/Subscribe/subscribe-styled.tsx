import styled from 'styled-components';

export const SubscribeContainer = styled.div`
  max-width: 720px;
  margin: 10px auto 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const FollowingFollower = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  margin: 10px;

  h3 {
    text-align: center;
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
  }
`;

export const FollowersContainer = styled(FollowingFollower)``;
export const FollowingsContainer = styled(FollowingFollower)``;

export const SubscribeItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-weight: bold;
    cursor: pointer;
    &:hover {
      opacity: 0.6;
      transition: all 0.2s;
    }
  }
  button {
  }
`;
