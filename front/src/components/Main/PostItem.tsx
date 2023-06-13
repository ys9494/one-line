import { PostType } from '@/types/getTypes';
import {
  PostItemWrapper,
  ViewsAndLikes,
  Detail,
  UserInfoAndTime,
} from './posts-styled';
import { convertCreatedAt } from '@/utils/util';
import Image from 'next/image';
import { useRouter } from 'next/router';

const PostItem = (props: PostType) => {
  // console.log('props', props);
  const router = useRouter();

  return (
    <PostItemWrapper onClick={() => router.push(`/post/${props.id}`)}>
      <Detail>
        <h3>{props.title}</h3>
        <p>{props.summary}</p>
      </Detail>
      <UserInfoAndTime>
        <div onClick={() => router.push(`/@${props.User?.nickname}`)}>
          {props.User?.image ? (
            <Image
              src={props.User?.image}
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
          <span>{props.User?.nickname}</span>
        </div>
        <p>{convertCreatedAt(props.createdAt)}</p>
      </UserInfoAndTime>
      <ViewsAndLikes>
        <p>
          <span>views </span> {props.views}
        </p>
        <p>
          <Image
            src={'/images/heart-solid.svg'}
            alt="좋아요"
            width="12"
            height="12"
          />{' '}
          {props.Likers?.length}
        </p>
      </ViewsAndLikes>
    </PostItemWrapper>
  );
};

export default PostItem;
