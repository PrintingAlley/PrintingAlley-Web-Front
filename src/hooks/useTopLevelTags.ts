import axios from 'src/utils/axios';
import { useState, useEffect } from 'react';
import { Tag } from 'src/types/print-shop';

export const useTopLevelTags = () => {
  const [topLevelTags, setTopLevelTags] = useState<Tag[]>([]);
  const [tagHierarchies, setTagHierarchies] = useState<Record<number, Tag[]>>({});

  useEffect(() => {
    axios.get<Tag[]>('tag/top-level').then((response) => {
      setTopLevelTags(response.data);
      response.data.forEach((tag) => {
        axios.get<Tag>(`tag/${tag.id}/hierarchy`).then((res) => {
          setTagHierarchies((prev) => ({ ...prev, [tag.id]: res.data.children }));
        });
      });
    });
  }, []);

  return { topLevelTags, tagHierarchies };
};
