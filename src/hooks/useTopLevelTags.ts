import axios from 'src/utils/axios';
import { useState, useEffect } from 'react';
import { Tag } from 'src/types/print-shop';

type TagResponse = {
  hierarchies: Tag[];
};

export const useTopLevelTags = () => {
  const [topLevelTags, setTopLevelTags] = useState<Tag[]>([]);
  const [tagHierarchies, setTagHierarchies] = useState<Record<number, Tag[]>>({});

  useEffect(() => {
    axios.get<TagResponse>('tag').then((response) => {
      const { hierarchies } = response.data;
      setTopLevelTags(hierarchies);
      hierarchies.forEach((tag) => {
        setTagHierarchies((prev) => ({ ...prev, [tag.id]: tag.children }));
      });
    });
  }, []);

  return { topLevelTags, tagHierarchies };
};
