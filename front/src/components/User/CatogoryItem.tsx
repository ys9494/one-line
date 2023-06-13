import { CategoryType } from '@/types/getTypes';
import { CategoryItemContainer } from './user-styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryState } from '@/store/category';

const CatogoryItem = (category: CategoryType) => {
  const [categoryId, setCategoryId] = useRecoilState(categoryState);

  return (
    <CategoryItemContainer
      isActive={String(categoryId) === String(category.id)}
      onClick={() => setCategoryId(String(category.id))}
    >
      <span>{category.name}</span>
      <span>({category.Posts?.length})</span>
    </CategoryItemContainer>
  );
};

export default CatogoryItem;
