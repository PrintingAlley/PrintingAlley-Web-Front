import { useState, useEffect } from 'react';
import { Box, Pagination, Stack } from '@mui/material';
import axios from 'src/utils/axios';
import { useTag } from 'src/hooks/useTag';
import { SearchBar } from 'src/sections/common/SearchBar';
import CenteredTitle from 'src/sections/common/CenteredTitle';
import { GetProductsResponse, ProductWithTags, TagInterface } from 'src/types/response.dto';
import { ProductList } from 'src/sections/Product/ProductList';
import { Helmet } from 'react-helmet-async';
import { ProductCategory } from 'src/sections/Product/ProductCategory';
import { DEFAULT_SORT_BY, DEFAULT_SORT_ORDER, PRODUCT_PAGE_SIZE } from 'src/constants/commons';
import SortBar from 'src/sections/common/SortBar';
import FilterList from 'src/sections/Filter/FilterList';
import TagFilterDrawer from 'src/sections/Filter/TagFilterDrawer';
import { useRecoilState } from 'recoil';
import {
  currentPageState,
  searchTextState,
  selectedTagsState,
  selectedTopLevelTagState,
  sortByState,
  sortOrderState,
} from 'src/state/productState';

export default function ProductPage() {
  const { topLevelTags, tagHierarchies } = useTag();
  const [searchText, setSearchText] = useRecoilState(searchTextState);
  const [selectedTopLevelTag, setSelectedTopLevelTag] = useRecoilState(selectedTopLevelTagState);
  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);
  const [sortBy, setSortBy] = useRecoilState(sortByState);
  const [sortOrder, setSortOrder] = useRecoilState(sortOrderState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [products, setProducts] = useState<ProductWithTags[] | null>(null);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const fetchProducts = (page = 1, search = '', tags = [] as TagInterface[]) => {
    axios
      .get<GetProductsResponse>('/product', {
        params: {
          page,
          size: PRODUCT_PAGE_SIZE,
          searchText: search,
          tagIds: tags.map((tag) => tag.id),
          sortBy,
          sortOrder,
        },
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
    setSortBy(DEFAULT_SORT_BY);
    setSortOrder(DEFAULT_SORT_ORDER);
  };

  useEffect(() => {
    fetchProducts(currentPage, searchText, selectedTags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchText, selectedTags, sortBy, sortOrder]);

  return (
    <Stack spacing={3} flexGrow={1}>
      <Helmet>
        <title>인쇄골목</title>
      </Helmet>

      <CenteredTitle
        title="인쇄골목"
        sx={{ fontFamily: 'Godo, sans-serif', color: 'primary.main', letterSpacing: 1 }}
      />

      <SearchBar searchText={searchText} onSearch={setSearchText} resetSearch={resetSearch} />

      <ProductCategory
        selectedTopLevelTag={selectedTopLevelTag}
        setSelectedTopLevelTag={setSelectedTopLevelTag}
        setSelectedTags={setSelectedTags}
        topLevelTags={topLevelTags}
      />

      <Stack spacing={2} mb={1}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <TagFilterDrawer
            type="product"
            selectedTopLevelTag={selectedTopLevelTag}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            tags={tagHierarchies}
            topLevelTags={topLevelTags}
            setSelectedTopLevelTag={setSelectedTopLevelTag}
          />

          <SortBar
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </Stack>

        <FilterList
          selectedTopLevelTag={selectedTopLevelTag}
          setSelectedTopLevelTag={setSelectedTopLevelTag}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      </Stack>

      {products && <ProductList products={products} />}

      <Box sx={{ flexGrow: 1 }} />

      <Pagination
        count={Math.ceil(totalProducts / PRODUCT_PAGE_SIZE)}
        page={currentPage}
        onChange={(_event, value) => setCurrentPage(value)}
        variant="outlined"
        shape="rounded"
        sx={{ alignSelf: 'center' }}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}
