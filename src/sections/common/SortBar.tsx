import React from 'react';
import { Select, MenuItem, SelectChangeEvent, Stack } from '@mui/material';

const sortOptions = [
  { value: 'name', label: '이름' },
  { value: 'viewCount', label: '조회수' },
  { value: 'bookmarkCount', label: '북마크 수' },
  { value: 'reviewCount', label: '리뷰 수' },
  { value: 'createdAt', label: '등록일' },
];

const orderOptions = [
  { value: 'ASC', label: '오름차순' },
  { value: 'DESC', label: '내림차순' },
];

interface SortBarProps {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: 'ASC' | 'DESC';
  setSortOrder: React.Dispatch<React.SetStateAction<'ASC' | 'DESC'>>;
}

const SortBar = ({ sortBy, setSortBy, sortOrder, setSortOrder }: SortBarProps) => {
  const handleSortByChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event: SelectChangeEvent) => {
    setSortOrder(event.target.value as 'ASC' | 'DESC');
  };

  return (
    <Stack direction="row" gap={1}>
      <Select value={sortBy} onChange={handleSortByChange} size="small" sx={{ borderRadius: 3 }}>
        {sortOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <Select
        value={sortOrder}
        onChange={handleSortOrderChange}
        size="small"
        sx={{ borderRadius: 3 }}
      >
        {orderOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default SortBar;
