import { atom } from 'recoil';
import { DEFAULT_SORT_BY, DEFAULT_SORT_ORDER } from 'src/constants/commons';
import { TagInterface } from 'src/types/response.dto';

export const searchTextState = atom<string>({
  key: 'printShopSearchTextState',
  default: '',
});

export const selectedTopLevelTagState = atom<TagInterface | null>({
  key: 'printShopSelectedTopLevelTagState',
  default: null,
});

export const selectedTagsState = atom<TagInterface[]>({
  key: 'printShopSelectedTagsState',
  default: [],
});

export const sortByState = atom<string>({
  key: 'printShopSortByState',
  default: DEFAULT_SORT_BY,
});

export const sortOrderState = atom<'ASC' | 'DESC'>({
  key: 'printShopSortOrderState',
  default: DEFAULT_SORT_ORDER,
});

export const currentPageState = atom<number>({
  key: 'printShopCurrentPageState',
  default: 1,
});
