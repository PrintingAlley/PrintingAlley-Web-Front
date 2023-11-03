import axios from 'src/utils/axios';
import { useState, useEffect } from 'react';
import { GetTagsResponse, TagInterface } from 'src/types/response.dto';

export const useTag = () => {
  const [topLevelTags, setTopLevelTags] = useState<TagInterface[]>([]);
  const [tagHierarchies, setTagHierarchies] = useState<Record<number, TagInterface[]>>({});

  useEffect(() => {
    axios.get<GetTagsResponse>('/tag').then((response) => {
      const { hierarchies } = response.data;
      setTopLevelTags(hierarchies);
      hierarchies.forEach((tag) => {
        setTagHierarchies((prev) => ({ ...prev, [tag.id]: tag.children }));
      });
    });
  }, []);

  return { topLevelTags, tagHierarchies };
};
