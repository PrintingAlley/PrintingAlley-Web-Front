import { Box, Button, TextField, InputAdornment } from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/components/iconify';

interface SearchBarProps {
  searchText: string;
  onSearch: (query: string) => void;
  resetSearch: () => void;
  placeholder?: string;
}

export const SearchBar = ({
  searchText,
  onSearch,
  resetSearch,
  placeholder = '검색어를 입력하세요',
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(searchText);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleReset = () => {
    setSearchQuery('');
    resetSearch();
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
        placeholder={placeholder}
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
