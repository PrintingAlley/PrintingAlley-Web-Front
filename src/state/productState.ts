import { atom } from 'recoil';
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
  default: 'name',
});

export const sortOrderState = atom<'ASC' | 'DESC'>({
  key: 'productSortOrderState',
  default: 'ASC',
});

export const currentPageState = atom<number>({
  key: 'productCurrentPageState',
  default: 1,
});
