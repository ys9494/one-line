import auth from '@/components/common/auth';

export const convertCreatedAt = (createdAt: string): string => {
  const date = new Date(createdAt);
  const now = new Date();
  const diff = Math.abs(now.getTime() - date.getTime());

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return years === 1 ? '1년 전' : `${years}년 전`;
  } else if (months > 0) {
    return months === 1 ? '1달 전' : `${months}달 전`;
  } else if (days > 0) {
    return days === 1 ? '1일 전' : `${days}일 전`;
  } else if (hours > 0) {
    return hours === 1 ? '1시간 전' : `${hours}시간 전`;
  } else {
    return minutes === 0 ? '방금 전' : `${minutes}분 전`;
  }
};

type User = {
  email: string;
  nickname: string;
};

export const getUserInfo = async (): Promise<User | null> => {
  return new Promise(resolve => {
    if (auth.currentUser) {
      resolve({
        email: auth.currentUser.email || '',
        nickname: auth.currentUser.displayName || '',
      });
    } else {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          resolve({
            email: user.email || '',
            nickname: user.displayName || '',
          });
          unsubscribe(); // 사용자 정보가 얻어진 후에는 이벤트 리스너 해제
        }
      });
    }
  });
};
