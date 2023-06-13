import { PostType } from '@/types/getTypes';
import {
  PostItemContainer,
  InfoWrapper,
  UserInfo,
  PostInfo,
} from './post-styled';
import { convertCreatedAt } from '@/utils/util';
import { useRouter } from 'next/router';
import Image from 'next/image';

const PostItem = (post: PostType) => {
  const router = useRouter();

  const goToDetailPage = () => {
    router.push(`/post/${post.id}`);
  };

  return (
    <PostItemContainer onClick={goToDetailPage}>
      <h4>{post.title}</h4>
      <p>{post.summary}</p>
      <InfoWrapper>
        {post.User ? (
          <UserInfo>
            {post.User?.image ? (
              <Image
                src={post.User?.image}
                alt="프로필"
                width="24"
                height="24"
              />
            ) : (
              <Image
                src={'/images/UserProfile.png'}
                alt="프로필"
                width="24"
                height="24"
              />
            )}
            <span>{post.User?.nickname}</span>
          </UserInfo>
        ) : (
          <div></div>
        )}

        <PostInfo>
          <span>{convertCreatedAt(post.createdAt)}</span>
          <div></div>
          <span>조회 {post.views}</span>
          <div></div>
          <span>♥ {post.Likers?.length}</span>
        </PostInfo>
      </InfoWrapper>
    </PostItemContainer>
  );
};

export default PostItem;
