import {
  PostDetailContainer,
  Title,
  PostEditDeleteWrapper,
  Author,
  Profile,
  Post,
  SummaryWrapper,
  CommentInputForm,
  CommentInput,
  CommentAuthor,
  CommentContainer,
  CommentDetailWrapper,
  Comment,
  UpdateCommentForm,
  UpdateComment,
} from './posts-styled';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as api from '@/utils/api';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import auth from '@/components/common/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { PostType } from '@/types/getTypes';
import { CommentFormType } from '@/types/formTypes';
import { convertCreatedAt } from '@/utils/util';
import Image from 'next/image';

const PostDetail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormType>();

  const user = auth.currentUser || null;
  const router = useRouter();
  const [Id, setId] = useState<string>('');
  const [Postdata, setPostdata] = useState<PostType>();
  const [Isliked, setIsliked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [IsEditingCommentId, setIsEditingCommentId] = useState<number | null>();
  const [EditingComment, setEditingComment] = useState<string>('');
  const [IsCommentEdit, SetIsCommentEdit] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const id = String(router.query.id);
      setId(id);
      getPost(id);
    }
  }, [router]);

  useEffect(() => {
    if (Postdata) {
      const Likers = Postdata?.Likers;
      setLikeCount(Postdata.Likers?.length || 0);
      if (Likers && Likers.length > 0) {
        const isLiked = Likers?.find(
          like => like.nickname == user?.displayName
        );
        if (isLiked) {
          setIsliked(true);
        }
      }
    }
  }, [Postdata]);

  // useEffect(() => {
  //   console.log('cId', IsEditingCommentId, typeof IsEditingCommentId);
  // }, [IsEditingCommentId]);

  const getPost = async (id: string) => {
    const response = await api.get<PostType>(`/posts/${id}`);
    const postData = response.data?.data;
    if (response.status === 200) {
      setPostdata(postData);
    }
  };

  const deletePost = async () => {
    if (!confirm('게시글을 삭제하시겠습니까?')) {
      return;
    }
    try {
      await api.delete(`/posts/${Id}`);
      window.location.replace('/');
    } catch (error: any) {
      alert(error);
    }
  };

  const onCommentSubmitHandler: SubmitHandler<CommentFormType> = async data => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return router.push('/login');
    }
    try {
      const response = await api.post(`/comments/${Id}`, data);
      // console.log('res', response);
      window.location.reload();
    } catch (error: any) {
      alert(error);
    }
  };

  const deleteComment = async (commentId: number) => {
    if (!confirm('댓글을 삭제하시겠습니까?')) {
      return;
    }
    try {
      const response = await api.delete(`/comments/${commentId}`);
      if (response.status === 200) {
        getPost(Id);
      }
    } catch (error: any) {
      alert(error);
    }
  };

  const addLike = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return router.push('/login');
    }
    setIsliked(!Isliked);
    try {
      const response = await api.patch<string>(`posts/${Id}/like`, {});
      if (response.status === 200) {
        setLikeCount(likeCount + 1);
      }
    } catch (error: any) {
      setIsliked(Isliked);
      alert(error);
    }
  };

  const deleteLike = async () => {
    setIsliked(!Isliked);
    try {
      const response = await api.delete(`posts/${Id}/like`);
      if (response.status === 200 && likeCount > 0) {
        setLikeCount(likeCount - 1);
      }
    } catch (error: any) {
      alert(error);
    }
  };

  const updateComment = async (commentId: string, data: string) => {
    // console.log('updata', { commentId, data });

    try {
      const response = await api.patch(`/comments/${commentId}`, {
        content: data,
      });
      // console.log('??', response);
      if (response.status === 200) {
        getPost(Id);
      }
      SetIsCommentEdit(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  const goToUserPage = () => {
    const userNickname = Postdata?.User?.nickname;
    router.push(`/@${userNickname}`);
  };

  if (!Postdata) {
    return <></>;
  }

  return (
    <PostDetailContainer>
      <PostEditDeleteWrapper>
        {user?.displayName == Postdata.User?.nickname ? (
          <div>
            <Link href={`/edit/${Id}`}>수정</Link>
            <button type="button" onClick={deletePost}>
              삭제
            </button>
          </div>
        ) : null}
      </PostEditDeleteWrapper>
      <Title>{Postdata.title}</Title>
      <Author>
        <Profile onClick={goToUserPage}>
          {Postdata.User?.image ? (
            <Image
              src={Postdata.User?.image}
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
          <span>{Postdata.User?.nickname}</span>
        </Profile>

        <div style={{ color: 'gray', fontSize: '0.7rem' }}>
          <span>{convertCreatedAt(Postdata.createdAt)}</span>
          <span> · </span>
          <span> 조회수 {Postdata.views}</span>
          <span> · </span>
          {Isliked ? (
            <span
              onClick={deleteLike}
              style={{ color: 'pink', cursor: 'pointer' }}
            >
              ♥ {likeCount}
            </span>
          ) : (
            <span onClick={addLike} style={{ cursor: 'pointer' }}>
              ♡ {likeCount}
            </span>
          )}
        </div>
      </Author>
      <Post>
        <SummaryWrapper>
          <h3>요약</h3>
          <p> {Postdata.summary}</p>
        </SummaryWrapper>
        <div dangerouslySetInnerHTML={{ __html: Postdata.content }}></div>
      </Post>

      <CommentInputForm onSubmit={handleSubmit(onCommentSubmitHandler)}>
        <p style={{ padding: '1em 0', fontSize: '0.7rem' }}>
          {Postdata.Comments?.length} comments
        </p>
        <div>
          <CommentInput
            {...register('content', {
              required: true,
              minLength: 1,
              maxLength: 200,
            })}
          />
          <button>등록</button>
        </div>
      </CommentInputForm>

      {Postdata.Comments?.map(comment => {
        return (
          <CommentContainer key={comment.id}>
            <CommentAuthor>
              <Profile
                onClick={() => router.push(`/@${comment.User.nickname}`)}
              >
                {comment.User.image ? (
                  <Image
                    src={comment.User.image}
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
                <span>{comment.User.nickname}</span>
              </Profile>
              <span>{convertCreatedAt(comment.createdAt)}</span>
            </CommentAuthor>
            {IsCommentEdit && IsEditingCommentId === comment.id ? (
              <UpdateCommentForm
                onSubmit={e => {
                  e.preventDefault();
                  updateComment(String(comment.id), EditingComment);
                }}
              >
                <UpdateComment
                  value={EditingComment}
                  onChange={e => {
                    setEditingComment(e.target.value);
                  }}
                  required
                />
                <button>완료</button>
              </UpdateCommentForm>
            ) : (
              <CommentDetailWrapper>
                <Comment>{comment.content}</Comment>
                {user?.displayName == comment.User.nickname ? (
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        SetIsCommentEdit(true);
                        setIsEditingCommentId(comment?.id);
                        setEditingComment(comment.content);
                      }}
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteComment(comment?.id)}
                    >
                      삭제
                    </button>
                  </div>
                ) : null}
              </CommentDetailWrapper>
            )}
          </CommentContainer>
        );
      })}
    </PostDetailContainer>
  );
};

export default PostDetail;
