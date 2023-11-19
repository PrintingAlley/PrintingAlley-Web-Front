import { atom } from 'recoil';
import { DEFAULT_SORT_BY, DEFAULT_SORT_ORDER } from 'src/constants/commons';
import { TagInterface } from 'src/types/response.dto';

export const searchTextState = atom<string>({
  key: 'productSearchTextState',
  default: '',
});

export const selectedTopLevelTagState = atom<TagInterface | null>({
  key: 'productSelectedTopLevelTagState',
  default: null,
});

export const selectedTagsState = atom<TagInterface[]>({
  key: 'productSelectedTagsState',
  default: [],
});

export const sortByState = atom<string>({
  key: 'productSortByState',
  default: DEFAULT_SORT_BY,
});

export const sortOrderState = atom<'ASC' | 'DESC'>({
  key: 'productSortOrderState',
  default: DEFAULT_SORT_ORDER,
});

export const currentPageState = atom<number>({
  key: 'productCurrentPageState',
  default: 1,
});

export const prevTopLevelTagState = atom<TagInterface | null>({
  key: 'productPreTopLevelTagState',
  default: null,
});
