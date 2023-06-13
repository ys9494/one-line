import PostItem from './PostItem';
import { PostType } from '@/types/getTypes';
import { PostListContainer, NoPosts } from './post-styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryState } from '@/store/category';
import { useEffect, useState } from 'react';
import * as API from '@/utils/api';

type Props = {
  posts: PostType[];
};

const PostList = ({ posts }: Props) => {
  const [userPosts, setUserPosts] = useState<PostType[]>();
  const categoryId = useRecoilValue(categoryState);

  const getPostsByCategory = async (categoryId: string) => {
    const response = await API.get<PostType>(`/posts/category/${categoryId}`);
    setUserPosts(response.data.data);
  };

  useEffect(() => {
    if (categoryId) {
      getPostsByCategory(categoryId);
    } else {
      setUserPosts(posts);
    }
  }, [categoryId]);

  if (!userPosts) {
    return <></>;
  }

  return (
    <PostListContainer>
      {userPosts.map(post => {
        return <PostItem key={post.id} {...post} />;
      })}
      {userPosts.length === 0 && <NoPosts>게시글이 없습니다.</NoPosts>}
    </PostListContainer>
  );
};

export default PostList;
