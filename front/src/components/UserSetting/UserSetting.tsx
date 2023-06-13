import { useEffect, useRef, useState } from 'react';
import {
  SettingContainer,
  SettingForm,
  ProfileImageWrapper,
  ImageInput,
  ImageInputArea,
  ImageHolder,
  ImageDeleteBtn,
  SpanWrapper,
  InputWrapper,
  UserSettingInput,
  SubmitButton,
  DeleteAccountButton,
} from './user-setting-styled';
import * as API from '@/utils/api';
import { UserType } from '@/types/getTypes';
import { useRouter } from 'next/router';
import auth from '../common/auth';
import { signOut } from 'firebase/auth';
import { UserFormType } from '@/types/formTypes';

const UserSetting = () => {
  const [userData, setUserData] = useState<UserType>();
  const [image, setImage] = useState<string>('');
  const [imageFile, setImageFile] = useState<any>('');
  const blogNameRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const getUser = async () => {
    const response = await API.get<UserType>('/user');
    // console.log('user', response);
    setUserData(response.data.data);
  };

  const handleUserEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const blogName = blogNameRef.current?.value;
    const bio = bioRef.current?.value;

    if (!blogName) return alert('블로그 이름을 입력하세요');
    if (!bio) return alert('소개를 입력하세요');

    const data = new FormData();
    data.append('blogName', blogName);
    data.append('bio', bio);
    data.append('image', imageFile);

    const response = await API.patch<UserFormType>('user', data);
    // console.log('user edit : ', response);
    if (response.status === 200) {
      router.push('/');
      return alert('회원정보가 수정되었습니다.');
    }
  };

  const onChangeImage = (e: any) => {
    if (e.target.files.length > 0) {
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setImage(imageUrl);
      setImageFile(imageFile);
    }
  };

  const handleDeleteImage = () => {
    setImage('');
    setImageFile('');
  };

  const handleDeleteAccount = async () => {
    await API.delete<UserType>('/user');
    signOut(auth);
    router.replace('/');
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    // console.log('image', image, imageFile);
  }, [image, imageFile]);

  useEffect(() => {
    if (userData) {
      setImage(userData?.image);
    }
  }, [userData]);

  if (!userData) {
    return <></>;
  }

  return (
    <SettingContainer>
      <h1>회원정보 설정</h1>
      <ProfileImageWrapper>
        <ImageInputArea onChange={onChangeImage}>
          <ImageInput type="file" />
          {image ? (
            <ImageHolder src={image} alt="이미지 업로드" />
          ) : (
            <ImageHolder src="/images/UserProfile.png" alt="이미지없음" />
          )}
        </ImageInputArea>
        {image ? (
          <ImageDeleteBtn type="button" onClick={handleDeleteImage}>
            이미지 삭제
          </ImageDeleteBtn>
        ) : (
          <ImageDeleteBtn type="button">이미지 삭제</ImageDeleteBtn>
        )}
      </ProfileImageWrapper>
      <SettingForm onSubmit={handleUserEdit}>
        <SpanWrapper>
          <label>이메일</label>
          <span>{userData.email}</span>
        </SpanWrapper>
        <SpanWrapper>
          <label>닉네임</label>
          <span>{userData.nickname}</span>
        </SpanWrapper>
        <InputWrapper>
          <label>블로그 이름</label>
          <UserSettingInput
            name="blogName"
            type="text"
            defaultValue={userData.blogName}
            placeholder="블로그 이름을 입력하세요"
            ref={blogNameRef}
            required
          />
        </InputWrapper>
        <InputWrapper>
          <label>한 줄 소개</label>
          <UserSettingInput
            name="bio"
            type="text"
            defaultValue={userData.bio}
            placeholder="블로그 소개를 입력하세요"
            ref={bioRef}
            required
          />
        </InputWrapper>
        <SubmitButton type="submit">저장</SubmitButton>
      </SettingForm>
      <DeleteAccountButton type="button" onClick={handleDeleteAccount}>
        회원탈퇴
      </DeleteAccountButton>
    </SettingContainer>
  );
};

export default UserSetting;
