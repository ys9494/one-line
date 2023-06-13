import { HeaderModalContainer } from './header-styled';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/user';
import { useRouter } from 'next/router';
import auth from './auth';
import { signOut } from 'firebase/auth';

const HeaderModal = ({ isVisible }: { isVisible: boolean }) => {
  const userNickname = useRecoilValue(userState);
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth);
    router.replace('/');
  };

  return (
    <HeaderModalContainer isVisible={isVisible}>
      <Link href={`/@${userNickname}`}>내 게시글</Link>
      <Link href={'/write'}>글 작성</Link>
      <Link href={'/subscribe'}>팔로우 목록</Link>
      <Link href={'/category'}>카테고리 설정</Link>
      <Link href={'/setting'}>회원정보 설정</Link>
      <button type="button" onClick={handleLogout}>
        로그아웃
      </button>
    </HeaderModalContainer>
  );
};

export default HeaderModal;
