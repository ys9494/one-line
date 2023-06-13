import { useState, useEffect } from 'react';
import { PostListContainer, LoadingWrapper } from './posts-styled';
import { Grid, Box } from '@mui/material';
import { PostType } from '@/types/getTypes';
import PostItem from './PostItem';
import * as API from '@/utils/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from 'next/router';
import { Spinner } from '../common/LoadingSpinner';

const Trending = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState(1); // 페이지 번호를 저장하는 상태
  const router = useRouter();

  useEffect(() => {
    loadPosts(page);
  }, []);

  const loadMorePosts = () => {
    const nextPage = page + 1;
    loadPosts(nextPage);
    setPage(nextPage);
  };

  const loadPosts = async (page: number) => {
    const { data }: any = await API.get<PostType>(
      `/posts/trending?pageNo=${page}`
    );
    const response: PostType[] = data.data?.rows;
    // console.log(response);

    if (response.length < 1) {
      setHasMore(false);
      return;
    }

    setPosts(prevItems => {
      // 중복되지 않는 데이터만 추가
      const uniqueItems: PostType[] = response.filter(
        item => !prevItems.some(prevItem => prevItem.id === item.id)
      );
      return [...prevItems, ...uniqueItems];
    });
  };

  return (
    <PostListContainer>
      <InfiniteScroll
        dataLength={posts.length}
        next={loadMorePosts}
        hasMore={hasMore}
        loader={
          <LoadingWrapper>
            <Spinner
              width="20px"
              height="20px"
              border="3px"
              borderColor="#ddd"
            />
          </LoadingWrapper>
        }
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>마지막 게시물</b>
          </p>
        }
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={5}>
            {posts.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <PostItem {...item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </InfiniteScroll>
    </PostListContainer>
  );
};

export default Trending;
