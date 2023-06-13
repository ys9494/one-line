import { useEffect, useState } from 'react';
import * as API from '@/utils/api';
import { UserType } from '@/types/getTypes';
import {
  UserPageContainer,
  UserDetailContainer,
  UserProfileImageWrapper,
  UserProfileWrapper,
  UserProfile,
  UserInfoWrapper,
  UserPostContainer,
  UserCategoryContainer,
  CategoryExpandWrapper,
  MySubscribeNumber,
} from './user-styled';
import PostList from '../common/Post/PostList';
import CategoryList from './CategoryList';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Spinner, LoadingWrapper } from '../common/LoadingSpinner';
import { useRecoilState } from 'recoil';
import { categoryState } from '@/store/category';

type Props = {
  nickname: string;
};

const MyPage = ({ nickname }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, SetUserData] = useState<UserType>();
  const [isCategoryVisible, setIsCategoryVisible] = useState<boolean>(true);
  const [categoryId, setCategoryId] = useRecoilState(categoryState);

  useEffect(() => {
    setCategoryId('');
  }, []);

  const router = useRouter();

  const getUserData = async () => {
    setIsLoading(true);
    const response = await API.get<UserType>('/user');
    // console.log('ressss', response);
    if (response.status === 200) {
      SetUserData(response.data.data);
    } else {
      router.push('/');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // console.log('mypage', nickname);

    if (nickname) {
      getUserData();
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
          <Link href={'/setting'}>
            <Image
              src={'/images/setting.svg'}
              alt="회원정보 설정"
              width="28"
              height="28"
            />
          </Link>
        </UserProfileWrapper>
      </UserDetailContainer>
      <MySubscribeNumber onClick={() => router.push('/subscribe')}>
        <h3>
          팔로잉
          <span>{userData.Followings.length}</span>
        </h3>
        <h3>
          팔로워
          <span>{userData.Followers.length}</span>
        </h3>
      </MySubscribeNumber>
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

export default MyPage;
