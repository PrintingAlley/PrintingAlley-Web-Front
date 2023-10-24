import axios from 'src/utils/axios';
import { useState, useEffect } from 'react';
import { Tag } from 'src/types/print-shop';

export const useTopLevelTags = () => {
  const [topLevelTags, setTopLevelTags] = useState<Tag[]>([]);
  const [tagHierarchies, setTagHierarchies] = useState<Record<number, Tag[]>>({});

  useEffect(() => {
    axios.get<Tag[]>('tag').then((response) => {
      setTopLevelTags(response.data);
      response.data.forEach((tag) => {
        setTagHierarchies((prev) => ({ ...prev, [tag.id]: tag.children }));
      });
    });
  }, []);

  return { topLevelTags, tagHierarchies };
};
