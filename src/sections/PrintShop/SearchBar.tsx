import { Box, Button, TextField, InputAdornment } from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/components/iconify';

export const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleReset = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 1.5,
      }}
    >
      <TextField
        value={searchQuery}
        placeholder="인쇄소 이름을 검색하세요."
        variant="outlined"
        fullWidth
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="ic:baseline-search" />
            </InputAdornment>
          ),
        }}
      />
      <Button type="submit" variant="contained" color="primary">
        검색
      </Button>
      <Button variant="outlined" onClick={handleReset}>
        초기화
      </Button>
    </Box>
  );
};
