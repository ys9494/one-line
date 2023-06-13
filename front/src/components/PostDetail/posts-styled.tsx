import styled from 'styled-components';
import Link from 'next/link';

export const PostDetailContainer = styled.main`
  max-width: 720px;
  margin: 0 auto;
  padding: 0 20px 80px;
`;

export const Title = styled.h1`
  font-weight: bold;
`;

export const PostEditDeleteWrapper = styled.div`
  display: flex;
  justify-content: right;
  margin-bottom: 10px;
  a {
    font-size: 1.1rem;
    font-weight: bold;
    &:hover {
      color: #598392;
      transition: all 0.3s;
    }
  }

  button {
    font-size: 1.1rem;
    border: none;
    background: none;
    margin-left: 20px;
    font-weight: bold;
    color: #9a9a9a;
    &:hover {
      color: #598392;
      transition: all 0.3s;
    }
  }
`;

export const Author = styled.div`
  margin: 0 auto;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  span {
    margin-left: 5px;
  }

  img {
    border-radius: 50%;
    background-color: #ddd;
  }
`;

export const Post = styled.div`
  width: 100%;
  padding: 10px;
  code {
    display: block;
    flex-wrap: wrap;
    width: 100%;
    background-color: #f8f8f8;
    padding: 10px;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

export const SummaryWrapper = styled.div`
  border-left: 2px solid #598392;
  background-color: #fbfbfb;
  padding: 3px 14px;
  margin: 20px 0;
  > h3 {
    font-size: 1rem;
    color: #777;
  }
  > p {
    font-weight: bold;
  }
`;

export const CommentInputForm = styled.form`
  width: 100%;
  div {
    display: flex;
    button {
      margin-left: 10px;
      border: none;
      background: none;
      width: 40px;
      font-weight: bold;
    }
  }
`;

export const CommentInput = styled.input`
  width: 100%;
  height: 40px;
  padding-left: 10px;
  background-color: #f1f3f5;
  border-radius: 0.5em;
  border: None;
  flex-grow: 1;
`;

export const CommentAuthor = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    color: #aaa;
    font-size: 0.7rem;
  }
`;

export const CommentContainer = styled.div`
  width: 100%;
  margin: 24px 0;
`;

export const CommentDetailWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  padding-left: 30px;
  button {
    border: none;
    margin-left: 14px;
    font-weight: bold;
    background: none;
  }
`;

export const Comment = styled.div`
  font-size: 1rem;
`;

export const UpdateCommentForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 20px;
  button {
    border: none;
    margin-left: 14px;
    font-weight: bold;
    background: none;
  }
`;

export const UpdateComment = styled.input`
  /* border: None; */
  border: 1px solid #ccc;
  border-radius: 5px;
  flex-grow: 1;
  margin: 5px 0;
  padding: 5px 7px;
`;
