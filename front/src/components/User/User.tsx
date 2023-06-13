import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as API from '@/utils/api';
import { UserType, Follow } from '@/types/getTypes';
import {
  UserPageContainer,
  UserDetailContainer,
  UserProfileImageWrapper,
  UserProfileWrapper,
  UserProfile,
  UserInfoWrapper,
  FollowButton,
  FollowingButton,
  UserPostContainer,
  UserCategoryContainer,
  CategoryExpandWrapper,
  SubscribeNumber,
} from './user-styled';
import PostList from '../common/Post/PostList';
import CategoryList from './CategoryList';
import Image from 'next/image';
import { Spinner, LoadingWrapper } from '../common/LoadingSpinner';
import { useRecoilState } from 'recoil';
import { categoryState } from '@/store/category';

type Props = {
  nickname: string;
};

const User = ({ nickname }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserType>();
  const [isCategoryVisible, setIsCategoryVisible] = useState<boolean>(true);
  const [isFollowing, setIsFollowing] = useState<boolean>();
  const [categoryId, setCategoryId] = useRecoilState(categoryState);

  useEffect(() => {
    setCategoryId('');
  }, []);

  const router = useRouter();

  const getUser = async (nickname: string) => {
    setIsLoading(true);
    const response = await API.get<UserType>(`/user/page?nickname=${nickname}`);
    // console.log('user res', response);
    if (response?.status === 200) {
      setUserData(response.data.data);
    } else {
      router.push('/404');
    }
    setIsLoading(false);
  };

  const getAndSetIsFollowing = async () => {
    const response = await API.get<Follow[]>('/user/followings');
    const following = response.data.find(item => item.nickname === nickname);
    following ? setIsFollowing(true) : setIsFollowing(false);
  };

  const followUser = async () => {
    const response = await API.post(`/user/followings/${userData?.id}`, {});
    if (response.status === 200) {
      setIsFollowing(true);
      // getUser(nickname);
    }
  };

  const unfollowUser = async () => {
    const response = await API.delete(`/user/followings/${userData?.id}`);
    if (response.status === 200) {
      setIsFollowing(false);
      // getUser(nickname);
    }
  };

  useEffect(() => {
    if (nickname) {
      getUser(nickname);
      getAndSetIsFollowing();
    }
  }, [nickname]);

  if (!userData || isLoading) {
    return (
      <LoadingWrapper>
        <Spinner width="50px" height="50px" border="8px" borderColor="#ddd" />
      </LoadingWrapper>
    );
  }

  return (
    <UserPageContainer>
      <UserDetailContainer>
        <UserProfileWrapper>
          <UserProfile>
            <UserProfileImageWrapper>
              {userData.image ? (
                <Image
                  src={userData.image}
                  alt="프로필"
                  width="64"
                  height="64"
                />
              ) : (
                <Image
                  src={'/images/UserProfile.png'}
                  alt="프로필"
                  width="64"
                  height="64"
                />
              )}
            </UserProfileImageWrapper>
            <UserInfoWrapper>
              <h1>{userData.blogName}</h1>
              <p>{userData.bio}</p>
            </UserInfoWrapper>
          </UserProfile>
          {isFollowing ? (
            <FollowingButton type="button" onClick={unfollowUser}>
              팔로잉
            </FollowingButton>
          ) : (
            <FollowButton type="button" onClick={followUser}>
              팔로우
            </FollowButton>
          )}
        </UserProfileWrapper>
      </UserDetailContainer>
      <SubscribeNumber>
        <h3>
          팔로잉
          <span>{userData.Followings.length}</span>
        </h3>
        <h3>
          팔로워
          <span>{userData.Followers.length}</span>
        </h3>
      </SubscribeNumber>
      <UserCategoryContainer>
        <div>
          <CategoryExpandWrapper
            onClick={() => setIsCategoryVisible(!isCategoryVisible)}
          >
            <h4>카테고리</h4>
            {isCategoryVisible ? (
              <Image
                src={'/images/expand_less.svg'}
                alt="카테고리닫기"
                width="24"
                height="24"
              />
            ) : (
              <Image
                src={'/images/expand_more.svg'}
                alt="카테고리보기"
                width="24"
                height="24"
              />
            )}
          </CategoryExpandWrapper>
          {isCategoryVisible ? (
            <CategoryList
              categories={userData.Categories}
              postLength={userData.Posts.length}
            />
          ) : (
            <></>
          )}
        </div>
      </UserCategoryContainer>
      <UserPostContainer>
        <h4>게시글</h4>
        <PostList posts={userData.Posts} />
      </UserPostContainer>
    </UserPageContainer>
  );
};

export default User;
