import React, { useEffect, useRef, useState } from 'react';
import {
  SearchContainer,
  SearchForm,
  SearchResultContainer,
  NoResultsWrapper,
} from './search-styled';
import Image from 'next/image';
import { PostType } from '@/types/getTypes';
import * as API from '@/utils/api';
import { useRouter } from 'next/router';
import PostList from '../common/Post/PostList';
import { Spinner, LoadingWrapper } from '../common/LoadingSpinner';

const Search = () => {
  const [searchResult, setSearchResult] = useState<PostType[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { keyword } = router.query;

  useEffect(() => {
    if (router.isReady) {
      if (keyword) {
        getSearchResult(String(keyword).trim());
      }
    }
  }, [router, keyword]);

  const getSearchResult = async (keyword: string) => {
    setIsLoading(true);
    const response = await API.get<PostType>(`/search?keyword=${keyword}`);
    if (response.status === 200) {
      setSearchResult(response.data.data);
    }
    setIsLoading(false);
  };

  const submitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchKeyword = searchRef.current?.value;

    if (!searchKeyword) {
      return alert('검색어를 입력하세요');
    }

    router.push(`/search?keyword=${searchKeyword}`);
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={submitSearch}>
        <button>
          <Image src="/images/search.svg" alt="검색" width="28" height="28" />
        </button>
        <input type="text" placeholder="검색어를 입력하세요" ref={searchRef} />
      </SearchForm>
      {isLoading ? (
        <LoadingWrapper>
          <Spinner width="50px" height="50px" border="8px" />
        </LoadingWrapper>
      ) : (
        <>
          {keyword ? (
            searchResult && searchResult.length > 0 ? (
              <SearchResultContainer>
                <h3>
                  <span>"{keyword}"</span>에 대한 검색 결과 (
                  {searchResult?.length}개)
                </h3>
                <PostList posts={searchResult} />
              </SearchResultContainer>
            ) : (
              <NoResultsWrapper>
                <h3>
                  <span>{keyword}</span>에 대한 검색 결과가 없습니다.
                </h3>
              </NoResultsWrapper>
            )
          ) : (
            <></>
          )}
        </>
      )}
    </SearchContainer>
  );
};

export default Search;
