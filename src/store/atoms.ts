import { atom } from 'recoil';

export const selectedTagsState = atom({
  key: 'selectedTagState',
  default: [] as number[],
});
