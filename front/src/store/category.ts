import { atom } from 'recoil';

export const categoryState = atom<string | undefined>({
  key: 'category',
  default: '',
});
