import { useEffect } from 'react';
import Header from '../common/Header';
import { getUserInfo } from '@/utils/util';
import { userState } from '@/store/user';
import { useRecoilState, useRecoilValue } from 'recoil';

const AppLayout = (props: { children: React.ReactNode }) => {
  const [userNickname, setUserNickname] = useRecoilState(userState);

  const getUser = async () => {
    const user = await getUserInfo();
    if (user) {
      setUserNickname(user.nickname);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default AppLayout;
