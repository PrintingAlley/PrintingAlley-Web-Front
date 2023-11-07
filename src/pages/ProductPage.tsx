import { useState, useEffect } from 'react';
import { Box, Pagination } from '@mui/material';
import axios from 'src/utils/axios';
import { useTag } from 'src/hooks/useTag';
import { TagFilter } from 'src/sections/Product/TagFilter';
import { SearchBar } from 'src/sections/common/SearchBar';
import CenteredTitle from 'src/sections/common/CenteredTitle';
import { GetProductsResponse, ProductWithTags, TagInterface } from 'src/types/response.dto';
import { ProductList } from 'src/sections/Product/ProductList';

export default function ProductPage() {
  const { topLevelTags, tagHierarchies } = useTag();
  const [searchText, setSearchText] = useState<string>('');
  const [selectedTopLevelTag, setSelectedTopLevelTag] = useState<TagInterface | null>(null);
  const [selectedTags, setSelectedTags] = useState<TagInterface[]>([]);
  const [products, setProducts] = useState<ProductWithTags[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const size = 10;

  const fetchProducts = (page = 1, search = '', tags = [] as TagInterface[]) => {
    axios
      .get<GetProductsResponse>('/product', {
        params: { page, size, searchText: search, tagIds: tags.map((tag) => tag.id) },
      })
      .then((response) => {
        setProducts(response.data.products);
        setTotalProducts(response.data.totalCount);
      });
  };

  const resetSearch = () => {
    setSearchText('');
    setSelectedTopLevelTag(null);
    setSelectedTags([]);
  };

  useEffect(() => {
    fetchProducts(currentPage, searchText, selectedTags);
  }, [currentPage, searchText, selectedTags]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <CenteredTitle title="인쇄 골목" />

      <SearchBar onSearch={setSearchText} resetSearch={resetSearch} />

      <TagFilter
        selectedTopLevelTag={selectedTopLevelTag}
        setSelectedTopLevelTag={setSelectedTopLevelTag}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        topLevelTags={topLevelTags}
        tags={tagHierarchies}
      />

      <ProductList products={products} />

      <Box sx={{ flexGrow: 1 }} />

      <Pagination
        count={Math.ceil(totalProducts / size)}
        page={currentPage}
        onChange={(_event, value) => setCurrentPage(value)}
        variant="outlined"
        shape="rounded"
        sx={{ alignSelf: 'center' }}
        showFirstButton
        showLastButton
      />
    </Box>
  );
}
