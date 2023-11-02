import axios from 'src/utils/axios';
import { useState, useEffect } from 'react';
import { CategoryInterface, GetCategoriesResponse } from 'src/types/response.dto';

export const useCategory = () => {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);

  useEffect(() => {
    axios.get<GetCategoriesResponse>('/category').then((response) => {
      setCategories(response.data.categories);
    });
  }, []);

  return { categories };
};
