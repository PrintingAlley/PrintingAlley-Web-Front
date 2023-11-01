import { useState, useEffect } from 'react';
import { Box, Pagination } from '@mui/material';
import axios from 'src/utils/axios';
import { PrintShopList } from 'src/sections/PrintShop/PrintShopList';
import { SearchBar } from 'src/sections/common/SearchBar';
import CenteredTitle from 'src/sections/common/CenteredTitle';
import { GetPrintShopsResponse, PrintShopInterface } from 'src/types/response.dto';

export default function PrintShopPage() {
  const [searchText, setSearchText] = useState<string>('');
  const [printShops, setPrintShops] = useState<PrintShopInterface[]>([]);
  const [totalPrintShops, setTotalPrintShops] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const size = 10;

  const fetchPrintShops = (page = 1, search = '', tags = [] as number[]) => {
    axios
      .get<GetPrintShopsResponse>('print-shop', {
        params: { page, size, searchText: search, tagIds: tags },
      })
      .then((response) => {
        setPrintShops(response.data.printShops);
        setTotalPrintShops(response.data.totalCount);
      });
  };

  const resetSearch = () => {
    setSearchText('');
  };

  useEffect(() => {
    fetchPrintShops(currentPage, searchText);
  }, [currentPage, searchText]);

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
