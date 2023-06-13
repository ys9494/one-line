import { CategoryType } from '@/types/getTypes';
import CatogoryItem from './CatogoryItem';
import { CategoryListContainer, CategoryItemContainer } from './user-styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryState } from '@/store/category';

type Props = {
  categories: CategoryType[];
  postLength: number;
};

const CategoryList = ({ categories, postLength }: Props) => {
  const [categoryId, setCategoryId] = useRecoilState(categoryState);

  return (
    <CategoryListContainer>
      <CategoryItemContainer
        isActive={categoryId === ''}
        onClick={() => setCategoryId('')}
      >
        <div>
          <span>전체</span>
          <span>({postLength})</span>
        </div>
      </CategoryItemContainer>
      {categories.map(category => {
        return <CatogoryItem key={category.id} {...category} />;
      })}
    </CategoryListContainer>
  );
};

export default CategoryList;
