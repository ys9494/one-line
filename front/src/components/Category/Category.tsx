import { useEffect, useRef, useState } from 'react';
import {
  CategoryContainer,
  CategoryFormWrapper,
  CategoryItemWrapper,
  AddButton,
} from './category-styled';
import CategoryItem from './CategoryItem';
import { CategoryType } from '@/types/getTypes';
import { CategoryFormType } from '@/types/formTypes';
import * as API from '@/utils/api';

const Category = () => {
  const [categories, setCategories] = useState<CategoryType[]>();

  useEffect(() => {
    getCategories();
  }, []);

  const categoryRef = useRef<HTMLInputElement>(null);

  const getCategories = async () => {
    const response = await API.get<any>('/categories');
    // console.log('res', response.data.data);
    setCategories(response.data.data);
  };

  const addCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = categoryRef.current?.value;

    if (name && name.length < 1) {
      alert('카테고리를 입력하세요');
      categoryRef.current?.focus();
    }

    const response = await API.post<CategoryFormType>('/categories', {
      name,
    });

    // console.log('cat post', response);
    await getCategories();
    categoryRef.current && (categoryRef.current.value = '');
  };

  return (
    <CategoryContainer>
      <h1>카테고리 설정</h1>
      <CategoryFormWrapper onSubmit={addCategory}>
        <input
          type="text"
          ref={categoryRef}
          placeholder="카테고리 추가"
          required
        />
        <AddButton>추가</AddButton>
      </CategoryFormWrapper>
      <CategoryItemWrapper>
        {categories &&
          categories.length > 0 &&
          categories.map(item => {
            return (
              <CategoryItem
                category={item}
                key={item.id}
                getCategories={getCategories}
              />
            );
          })}
      </CategoryItemWrapper>
    </CategoryContainer>
  );
};

export default Category;
