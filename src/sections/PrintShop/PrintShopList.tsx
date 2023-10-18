import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  TextField,
  Chip,
  IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Iconify from 'src/components/iconify/iconify';
import { selectedTagsState } from 'src/store/atoms';
import { PrintShop, Tag } from 'src/types/print-shop';

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    <TextField
      placeholder="인쇄소 이름을 검색하세요."
      variant="outlined"
      fullWidth
      onChange={(e) => onSearch(e.target.value)}
      InputProps={{
        startAdornment: <Iconify icon="ic:baseline-search" />,
      }}
    />
  </Box>
);

interface TagFilterProps {
  selectedTopLevelTag: Tag | null;
  tags: Record<number, Tag[]>;
}

const TagFilter = ({ selectedTopLevelTag, tags }: TagFilterProps) => {
  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);

  const handleTagClick = (tagId: number) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags((prev) => prev.filter((id) => id !== tagId));
    } else {
      setSelectedTags((prev) => [...prev, tagId]);
    }
  };

  useEffect(() => {
    setSelectedTags([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTopLevelTag]);

  if (!selectedTopLevelTag) {
    return null;
  }

  const tagList = tags[selectedTopLevelTag.id];

  return (
    <>
      {tagList.map((tag) => (
        <Box key={tag.id} sx={{ py: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
          {tag.children.length > 0 ? (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                {tag.name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  ml: 1,
                }}
              >
                {tag.children.map((child) =>
                  child.children.length > 0 ? (
                    <Box key={child.id} width={1} mb={1}>
                      <Typography variant="subtitle2" mb={0.5}>
                        {child.name}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 1,
                          ml: 1,
                        }}
                      >
                        {child.children.map((grandChild) => (
                          <Chip
                            color="secondary"
                            key={grandChild.id}
                            variant={selectedTags.includes(grandChild.id) ? 'filled' : 'outlined'}
                            onClick={() => handleTagClick(grandChild.id)}
                            label={grandChild.name}
                          />
                        ))}
                      </Box>
                    </Box>
                  ) : (
                    <Chip
                      color="info"
                      key={child.id}
                      variant={selectedTags.includes(child.id) ? 'filled' : 'outlined'}
                      onClick={() => handleTagClick(child.id)}
                      label={child.name}
                    />
                  )
                )}
              </Box>
            </Box>
          ) : (
            <Chip
              color="primary"
              variant={selectedTags.includes(tag.id) ? 'filled' : 'outlined'}
              onClick={() => handleTagClick(tag.id)}
              label={tag.name}
            />
          )}
        </Box>
      ))}
    </>
  );
};

interface PrintShopListProps {
  printShops: PrintShop[];
  setSelectedShop: (shop: PrintShop) => void;
  topLevelTags: Tag[];
  tagHierarchies: Record<number, Tag[]>;
}

export const PrintShopList = ({
  printShops,
  setSelectedShop,
  topLevelTags,
  tagHierarchies,
}: PrintShopListProps) => {
  const [selectedTopLevelTag, setSelectedTopLevelTag] = useState<Tag | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShops = printShops.filter((shop) =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        인쇄소 목록
      </Typography>
      <SearchBar onSearch={setSearchQuery} />

      <Box sx={{ height: 16 }} />

      <Typography variant="h5" gutterBottom>
        카테고리 선택
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {topLevelTags.map((tag) => (
          <Chip
            key={tag.id}
            variant={selectedTopLevelTag?.id === tag.id ? 'filled' : 'outlined'}
            onClick={() => setSelectedTopLevelTag(tag)}
            label={tag.name}
          />
        ))}
      </Box>

      <Box sx={{ height: 16 }} />

      <TagFilter selectedTopLevelTag={selectedTopLevelTag} tags={tagHierarchies} />

      <Box sx={{ height: 16 }} />

      <List>
        {filteredShops.map((shop) => (
          <ListItem
            key={shop.id}
            secondaryAction={
              <IconButton onClick={() => setSelectedShop(shop)}>
                <Iconify icon="ic:baseline-info" />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar alt="Logo" src={shop.logoImage} />
            </ListItemAvatar>
            <ListItemText primary={shop.name} secondary={shop.address} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
