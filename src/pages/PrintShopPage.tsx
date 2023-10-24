import { useState, useEffect } from 'react';
import { Box, Pagination } from '@mui/material';
import axios from 'src/utils/axios';
import { PrintShopList } from 'src/sections/PrintShop/PrintShopList';
import { PrintShop, Tag } from 'src/types/print-shop';
import { useTopLevelTags } from 'src/hooks/useTopLevelTags';
import { TagFilter } from 'src/sections/PrintShop/TagFilter';
import { SearchBar } from 'src/sections/PrintShop/SearchBar';
import CenteredTitle from 'src/sections/common/CenteredTitle';

interface PrintShopResponse {
  printShops: PrintShop[];
  totalCount: number;
}

export default function PrintShopPage() {
  const { topLevelTags, tagHierarchies } = useTopLevelTags();
  const [searchText, setSearchText] = useState<string>('');
  const [selectedTopLevelTag, setSelectedTopLevelTag] = useState<Tag | null>(null);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [printShops, setPrintShops] = useState<PrintShop[]>([]);
  const [totalPrintShops, setTotalPrintShops] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const size = 10;

  const fetchPrintShops = (page = 1, search = '', tags = [] as number[]) => {
    axios
      .get<PrintShopResponse>('print-shop', {
        params: { page, size, searchText: search, tagIds: tags },
      })
      .then((response) => {
        // console.log(response.request.responseURL);
        // console.log('Tag IDs: ', tags);
        setPrintShops(response.data.printShops);
        setTotalPrintShops(response.data.totalCount);
      });
  };

  const resetSearch = () => {
    setSearchText('');
    setSelectedTopLevelTag(null);
    setSelectedTags([]);
  };

  useEffect(() => {
    fetchPrintShops(currentPage, searchText, selectedTags);
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
      <CenteredTitle title="인쇄사 목록" />

      <SearchBar onSearch={setSearchText} resetSearch={resetSearch} />

      <TagFilter
        selectedTopLevelTag={selectedTopLevelTag}
        setSelectedTopLevelTag={setSelectedTopLevelTag}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        topLevelTags={topLevelTags}
        tags={tagHierarchies}
      />

      <PrintShopList printShops={printShops} />

      <Box sx={{ flexGrow: 1 }} />

      <Pagination
        count={Math.ceil(totalPrintShops / size)}
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
