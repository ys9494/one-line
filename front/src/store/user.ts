import { atom } from 'recoil';

export const userState = atom<string | undefined>({
  key: 'user',
  default: '',
});
