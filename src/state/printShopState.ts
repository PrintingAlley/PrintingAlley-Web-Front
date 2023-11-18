import { atom } from 'recoil';
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
  default: 'name',
});

export const sortOrderState = atom<'ASC' | 'DESC'>({
  key: 'printShopSortOrderState',
  default: 'ASC',
});

export const currentPageState = atom<number>({
  key: 'printShopCurrentPageState',
  default: 1,
});
