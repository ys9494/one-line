import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import {
  WritePostContainer,
  SubmitButtonContainer,
  TitleInput,
  ContentTextArea,
  SubmitButton,
  DeleteButton,
  SelectAndButtonsContainer,
  CategorySelectWrapper,
  SummaryContainer,
  SummaryButtonWrapper,
  SummaryTextarea,
} from './write-post-styled';
import { Spinner, LoadingWrapper } from '../common/LoadingSpinner';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import * as API from '@/utils/api';
import { CategoryType, PostType } from '@/types/getTypes';
import { PostFormType } from '@/types/formTypes';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/user';
import axios from 'axios';
import ReactQuill from 'react-quill';

const QuillEditor = dynamic(() => import('./QuillEditor'), {
  ssr: false,
  loading: () => (
    <LoadingWrapper>
      <Spinner width="50px" height="50px" border="8px" borderColor="#ddd" />
    </LoadingWrapper>
  ),
});

interface Props {
  isEdit?: Boolean;
}

interface Option {
  id: string | number | undefined;
  value: string | undefined;
}

const WritePost = ({ isEdit }: Props) => {
  const [html, setHtml] = useState<string>('');
  const [post, setPost] = useState<PostType>();
  const [categories, setCategories] = useState<CategoryType[]>();
  const [selectedOption, setSelectedOption] = useState<Option | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postId, setPostId] = useState<string | undefined>();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<ReactQuill>(null);
  const summaryRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const userNickname = useRecoilValue(userState);

  useEffect(() => {
    // console.log('edit', isEdit);
    if (router.isReady && isEdit) {
      const { id } = router.query;
      id && getPost(String(id));
      setPostId(String(id));
    }
  }, [router, isEdit]);

  useEffect(() => {
    getCategories();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selected = categories?.find(option => option.name === selectedValue);
    setSelectedOption({ id: selected?.id, value: selected?.name });
    // console.log('selectedOption', selectedOption);
  };

  const getPost = async (id: any) => {
    const response = await API.get<PostType>(`/posts/${id}`);
    // console.log('category response : ', response.status);
    // console.log({ userNickname, res: response.data.data.User.nickname });

    if (!userNickname) {
      router.push('/');
    } else {
      if (userNickname !== response.data.data.User.nickname) {
        router.push('/');
      } else {
        if (response.status === 200) {
          setPost(response.data.data);
          setHtml(response.data.data.content);
        }
      }
    }
  };

  useEffect(() => {
    if (post) {
      titleRef.current && (titleRef.current.value = post.title);
      summaryRef.current && (summaryRef.current.value = post.summary);
      if (post.Category) {
        setSelectedOption({ id: post.Category.id, value: post.Category.name });
      }
    }
  }, [post]);

  const getCategories = async () => {
    const response = await API.get<CategoryType>('/categories');
    setCategories(response.data.data);
  };

  const getModel = async (data: string) => {
    const jsonData = JSON.stringify({
      inputs: data,
      options: {
        wait_for_model: true,
      },
      parameters: {
        max_length: 100,
      },
    });

    try {
      setIsLoading(true);
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/baseballwow/baseball',
        jsonData,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGING_FACE_API_TOKEN}`,
          },
        }
      );

      if (response.status === 200) {
        const summary = response.data[0].generated_text;
        summaryRef.current && (summaryRef.current.value = summary.trim());
      } else {
        alert(
          '현재 요약 추천 서비스가 불안정한 상태입니다. 잠시 후에 다시 시도해 주세요. 서비스가 복구되지 않는다면 직접 요약을 작성해주시기 바랍니다. 죄송합니다.'
        );
      }
    } catch (error) {
      alert(
        '현재 요약 추천 서비스가 불안정한 상태입니다. 잠시 후에 다시 시도해 주세요. 서비스가 복구되지 않는다면 직접 요약을 작성해주시기 바랍니다. 죄송합니다.'
      );
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummary = async () => {
    const contentText = contentRef.current?.getEditor().getText();
    console.log('text : ', contentText);

    if (!contentText || contentText.length < 50) {
      alert('내용을 50자 이상 입력해주세요');
    } else {
      await getModel(contentText);
    }
  };

  const handleSubmit = async (mode: string) => {
    const title = titleRef.current?.value;
    const content = html;
    const summary = summaryRef.current?.value;

    if (!title) {
      alert('제목을 입력하세요');
      titleRef.current?.focus();
      return;
    }
    if (!summary) {
      alert('요약을 입력하세요');
      summaryRef.current?.focus();
      return;
    }
    if (!content) {
      alert('내용을 입력하세요');
      contentRef.current?.focus();
      return;
    }

    if (mode === 'edit') {
      const response = await API.patch<PostFormType>(`/posts/${postId}`, {
        title,
        content,
        summary,
        categoryId: selectedOption?.id,
      });

      if (response.status === 200) {
        alert('수정이 완료되었습니다.');
        router.push(`/post/${postId}`);
      }
    } else if (mode === 'create') {
      const response = await API.post<PostFormType>('/posts', {
        title,
        content,
        summary,
        categoryId: selectedOption?.id,
      });

      if (response.status === 201) {
        alert('작성이 완료되었습니다.');
        const postId = response.data.data.id;
        router.push(`/post/${postId}`);
      }
    }
  };

  const handleDelete = async () => {
    if (confirm('게시글을 삭제하시겠습니까?')) {
      await API.delete(`/posts/${postId}`);
      // console.log('delete response : ', response);
      router.push(`/`);
    }
  };

  const goback = () => {
    router.back();
  };

  return (
    <WritePostContainer>
      <SelectAndButtonsContainer>
        <CategorySelectWrapper>
          <select
            value={selectedOption?.value || ''}
            onChange={handleSelectChange}
          >
            <option value="" className="defaultSelect">
              ---카테고리---
            </option>
            {categories &&
              categories?.map(option => (
                <option key={option.id} value={option.name}>
                  {option.name}
                </option>
              ))}
          </select>
        </CategorySelectWrapper>

        {isEdit ? (
          <SubmitButtonContainer>
            <SubmitButton type="button" onClick={() => handleSubmit('edit')}>
              완료
            </SubmitButton>
            <DeleteButton type="button" onClick={handleDelete}>
              삭제
            </DeleteButton>
          </SubmitButtonContainer>
        ) : (
          <SubmitButtonContainer>
            <SubmitButton type="button" onClick={() => handleSubmit('create')}>
              저장
            </SubmitButton>
            <DeleteButton type="button" onClick={goback}>
              취소
            </DeleteButton>
          </SubmitButtonContainer>
        )}
      </SelectAndButtonsContainer>
      <TitleInput
        name="title"
        placeholder="제목을 입력하세요"
        type="text"
        ref={titleRef}
        maxLength={50}
      />
      <SummaryContainer>
        <SummaryButtonWrapper>
          {isLoading ? (
            <>
              <Spinner width="25px" height="25px" border="4px" />
              <span>요약 추천 받는 중</span>
            </>
          ) : (
            <>
              <Image
                src="/images/lightbulb.svg"
                alt="한 줄 요약 추천받기"
                width="25"
                height="25"
              />
              <button type="button" onClick={handleSummary}>
                한 줄 요약 추천받기
              </button>
            </>
          )}
        </SummaryButtonWrapper>
        <SummaryTextarea
          ref={summaryRef}
          maxLength={200}
          placeholder="한 줄 요약을 입력하세요 (내용이 50자 이상일 때는 요약 추천을 받아보세요)"
        />
      </SummaryContainer>
      <ContentTextArea>
        <QuillEditor setHtml={setHtml} html={html} quillRef={contentRef} />
      </ContentTextArea>
    </WritePostContainer>
  );
};

export default WritePost;
