import { atom } from 'recoil';
import { TagInterface } from 'src/types/response.dto';

export const topLevelTagsState = atom<TagInterface[]>({
  key: 'topLevelTagsState',
  default: [],
});

export const tagHierarchiesState = atom<Record<number, TagInterface[]>>({
  key: 'tagHierarchiesState',
  default: {},
});
