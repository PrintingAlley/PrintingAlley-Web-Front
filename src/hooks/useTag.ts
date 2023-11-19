import { useEffect } from 'react';
import axios from 'src/utils/axios';
import { useRecoilState } from 'recoil';
import { tagHierarchiesState, topLevelTagsState } from 'src/state/tagState';
import { GetTagsResponse } from 'src/types/response.dto';

export const useTag = () => {
  const [topLevelTags, setTopLevelTags] = useRecoilState(topLevelTagsState);
  const [tagHierarchies, setTagHierarchies] = useRecoilState(tagHierarchiesState);

  useEffect(() => {
    if (topLevelTags.length === 0) {
      axios.get<GetTagsResponse>('/tag').then((response) => {
        const { hierarchies } = response.data;
        setTopLevelTags(hierarchies);
        hierarchies.forEach((tag) => {
          setTagHierarchies((prev) => ({ ...prev, [tag.id]: tag.children }));
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTopLevelTags, setTagHierarchies]);

  return { topLevelTags, tagHierarchies };
};
