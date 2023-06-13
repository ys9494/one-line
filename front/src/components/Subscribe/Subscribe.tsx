import {
  SubscribeContainer,
  FollowersContainer,
  FollowingsContainer,
  SubscribeItemWrapper,
} from './subscribe-styled';
import { FollowButton, FollowingButton } from '../User/user-styled';
import { useEffect, useState } from 'react';
import * as API from '@/utils/api';
import { Follow } from '@/types/getTypes';
import { useRouter } from 'next/router';

const Subscribe = () => {
  const [followings, setFollowings] = useState<Follow[]>();
  const [followers, setFollowers] = useState<Follow[]>();
  const router = useRouter();

  const getFollowings = async () => {
    const response = await API.get<Follow[]>('/user/followings');
    setFollowings(response.data);
  };

  const getFollowers = async () => {
    const response = await API.get<Follow[]>('/user/followers');
    const followingData = response.data;
    // console.log('data', followingData);
    const followingIds = followings?.map(following => following.id);
    const updatedFollowers = followingData?.map(follower => {
      return {
        ...follower,
        isFollowing: followingIds?.includes(follower.id),
      };
    });
    // console.log('followers', updatedFollowers);
    setFollowers(updatedFollowers);
  };

  const followUser = async (id: string) => {
    await API.post(`/user/followings/${id}`, {});
    getFollowings();
    getFollowers();
  };

  const unfollowUser = async (id: string) => {
    await API.delete(`/user/followings/${id}`);
    getFollowings();
    getFollowers();
  };

  useEffect(() => {
    getFollowers();
    getFollowings();
  }, []);

  useEffect(() => {
    getFollowers();
  }, [followings]);

  return (
    <SubscribeContainer>
      <FollowersContainer>
        <h3>팔로워</h3>
        {followers?.map(follower => {
          return (
            <SubscribeItemWrapper key={follower.id}>
              <p onClick={() => router.push(`/@${follower.nickname}`)}>
                {follower.nickname}
              </p>
              {follower.isFollowing ? (
                <FollowingButton
                  type="button"
                  onClick={() => unfollowUser(follower.id)}
                >
                  팔로잉
                </FollowingButton>
              ) : (
                <FollowButton
                  type="button"
                  onClick={() => followUser(follower.id)}
                >
                  팔로우
                </FollowButton>
              )}
            </SubscribeItemWrapper>
          );
        })}
      </FollowersContainer>
      <FollowingsContainer>
        <h3>팔로잉</h3>
        {followings?.map(following => {
          return (
            <SubscribeItemWrapper key={following.id}>
              <p onClick={() => router.push(`/@${following.nickname}`)}>
                {following.nickname}
              </p>
              <FollowingButton
                type="button"
                onClick={() => unfollowUser(following.id)}
              >
                팔로잉
              </FollowingButton>
            </SubscribeItemWrapper>
          );
        })}
      </FollowingsContainer>
    </SubscribeContainer>
  );
};

export default Subscribe;
