import { Typography, Box, Stack, IconButton } from '@mui/material';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { TagInterface } from 'src/types/response.dto';

interface ProductCategoryProps {
  selectedTopLevelTag: TagInterface | null;
  setSelectedTopLevelTag: Dispatch<SetStateAction<TagInterface | null>>;
  setSelectedTags: Dispatch<SetStateAction<TagInterface[]>>;
  topLevelTags: TagInterface[];
}

export const ProductCategory = ({
  selectedTopLevelTag,
  setSelectedTopLevelTag,
  setSelectedTags,
  topLevelTags,
}: ProductCategoryProps) => {
  const toggleTopLevelTag = (tag: TagInterface) => {
    if (selectedTopLevelTag?.id === tag.id) {
      setSelectedTopLevelTag(null);
    } else {
      setSelectedTopLevelTag(tag);
    }
  };

  useEffect(() => {
    setSelectedTags(selectedTopLevelTag ? [selectedTopLevelTag] : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTopLevelTag]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 3.5,
        flexWrap: 'wrap',
        mt: 1,
      }}
    >
      {topLevelTags.map((tag) => {
        const isSelected = selectedTopLevelTag?.id === tag.id;
        return (
          <Stack key={tag.id} alignItems="center" gap={0.5}>
            <IconButton
              sx={{ p: 0 }}
              onClick={() => {
                toggleTopLevelTag(tag);
              }}
            >
              <Box
                component="img"
                src={tag.image ?? ''}
                alt={tag.name}
                sx={{ width: 56, height: 56, WebkitUserDrag: 'none' }}
              />
            </IconButton>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 'bold',
                color: isSelected ? 'primary.main' : 'text.secondary',
              }}
            >
              {tag.name}
            </Typography>
          </Stack>
        );
      })}
    </Box>
  );
};
