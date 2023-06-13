import User from '@/components/User/User';
import MyPage from '@/components/User/MyPage';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/user';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const UserPage = () => {
  const [isMe, setIsMe] = useState<boolean>(false);
  const [user, setUser] = useState<string>('');
  const userNickname = useRecoilValue(userState);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      // setUser(String(id));
      setUser(String(id)?.split('@')[1]);

      if (id && id[0] !== '@') {
        router.push('/404');
      }

      if (userNickname && id) {
        const nickname = '@' + userNickname;
        if (id === nickname) {
          setIsMe(true);
        } else {
          setIsMe(false);
        }
      }
    }
  }, [router, userNickname]);

  return (
    <>
      {isMe ? (
        <MyPage nickname={String(userNickname)} />
      ) : (
        <User nickname={user} />
      )}
    </>
  );
};

export default UserPage;
